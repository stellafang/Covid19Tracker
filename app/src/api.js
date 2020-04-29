import {getDiffInDays, convertToDate} from './utils'
import {setup} from 'axios-cache-adapter'
const url = 'https://pomber.github.io/covid19/timeseries.json'

// Configure Axios with cache
const instance = setup({
    baseURL: url,
    cache: {
        maxAge: 15 * 60 * 1000
    }
})

export const fetchData = async () => {
    try {
        const {data} = await instance.get(url)

        const [dates, countries, worldTotals, confirmedCasesByCountry] = await Promise.all([
            getDates(data),
            getCountries(data),
            getWorldTotals(data),
            getConfirmedByCountry(data)
        ])

        return {
            all: data,
            dates,
            countries,
            worldTotals,
            confirmedCasesByCountry
        }
    } catch (err) {
        console.error('Error fetching data: ', err)
    }
}


/* Parsers */

/**
 * Parses the given raw data and returns
 * a list of all dates there is data for in ascending order.
 * The dates are returned as JavaScript Date objects.
 * @param {Object} data raw data
 * 
 * @returns {Array<Date>}
 * @see https://pomber.github.io/covid19/timeseries.json
 */
export const getDates = async (data) => {
    return data ? data[Object.keys(data)[0]].map(({date}) => new Date(convertToDate(date))) : []
}

/**
 * Parses the given raw data and returns a list of countries there is data for.
 * @param {Object} data raw data
 * 
 * @returns {Array<String>} countries
 * @see https://pomber.github.io/covid19/timeseries.json
 */
export const getCountries = async (data) => (data ? Object.keys(data) : [])


/**
 * Parses the given raw data and returns world total
 * number of 'confirmed', 'deaths', 'recovered' cases.
 * @param {Object} data raw data
 * 
 * @returns {Object}
 * @example {totalConfirmed: 10, totalDeaths: 5, totalRecovered: 3}
 * @see https://pomber.github.io/covid19/timeseries.json
 */
export const getWorldTotals = async (data) => {
    const worldTotals = {
        totalConfirmed: 0,
        totalDeaths: 0,
        totalRecovered: 0
    }
    Object.entries(data).forEach(([country, stats]) => {
        const lastStat = stats[stats.length - 1]
        worldTotals.totalConfirmed += lastStat.confirmed
        worldTotals.totalDeaths += lastStat.deaths
        worldTotals.totalRecovered += lastStat.recovered
    })

    return worldTotals
}

/**
 * Parses the given raw data and returns a map of
 * country to confirmed number of cases.
 * @param {Object} data raw data
 * 
 * @returns {Object}
 * @example {totalConfirmed: 10, totalDeaths: 5, totalRecovered: 3}
 * @see https://pomber.github.io/covid19/timeseries.json
 */
export const getConfirmedByCountry = async (data) => {
    const confirmedByCountry = JSON.parse(JSON.stringify(Object.assign({}, data)))
    Object.keys(data).forEach((country) => {
        confirmedByCountry[country] = confirmedByCountry[country].map(({confirmed}) => confirmed)
    })
    return confirmedByCountry
}


/**
 * Gets the total number 'confirmed', 'deaths', 'recovered' cases between the 
 * given date range (start date inclusive) for each country.
 * @param {*} data raw data 
 * @param {Array} dates all the dates of the dataset as Date objects in ascending order.
 * @param {Date} start start Date
 * @param {Date} end end Date
 * 
 * @return {Array} 
 * @example {country: 'Canada', totalConfirmed: 130, totalDeaths: 40, totalRecovered: 70}
 * @see https://pomber.github.io/covid19/timeseries.json
 */
export const getCountryTotalsInDateRange = (data, dates, start, end) => {
    const indexStart = Math.max(getDiffInDays(dates[0], start), 1)
    const indexEnd = Math.min(getDiffInDays(dates[0], end), dates.length - 1)
    return Object.entries(data).map(([country, stats]) => ({
        country,
        totalConfirmed: stats[indexEnd].confirmed - stats[indexStart - 1].confirmed,
        totalDeaths: stats[indexEnd].deaths - stats[indexStart - 1].deaths,
        totalRecovered: stats[indexEnd].recovered - stats[indexStart - 1].recovered
    }))
}


