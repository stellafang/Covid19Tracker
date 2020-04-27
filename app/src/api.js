import axios from 'axios'
import {getDiffInDays} from './utils'
const url = 'https://pomber.github.io/covid19/timeseries.json'


export const fetchData = async () => {
    try {
        const {data} = await axios.get(url)

        const dates = getDates(data)
        const worldTotals = getWorldTotals(data)

        return {
            all: data,
            dates,
            worldTotals
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
const getDates = (data) => (
    data ? data[Object.keys(data)[0]].map(({date}) => new Date(date)) : []
)


/**
 * Parses the given raw data and returns world total
 * number of'confirmed', 'deaths', 'recovered' cases.
 * @param {Object} data raw data
 * 
 * @returns {Object}
 * @example {totalConfirmed: 10, totalDeaths: 5, totalRecovered: 3}
 * @see https://pomber.github.io/covid19/timeseries.json
 */
const getWorldTotals = (data) => {
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
