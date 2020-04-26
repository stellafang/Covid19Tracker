import axios from 'axios'

const url = 'https://pomber.github.io/covid19/timeseries.json'


export const fetchData = async () => {
    try {
        const {data} = await axios.get(url)
        const dates = await getDates(data)
        const worldTotals = await getWorldTotals(data)
        console.log('WORLD TOTALS', worldTotals)
        // const countryTotals = await getCountryTotalsInDateRange(data, dates, dates[0], dates[dates.length - 1])
        // console.log('countryTotals ', countryTotals)
        return {
            all: data,
            worldTotals,
            dates
        }
    } catch (err) {
        console.error(err)
    }
}

const getDates = async (data) => (data[Object.keys(data)[0]].map(({date}) => new Date(date)))


const getWorldTotals = async (data) => {
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
 * Get the total number confirmed, deaths, recovered cases between the given dates (start date inclusive).
 * @param {*} data all the data points per country.
 * @param {Array} dates all the dates of this timeseries in Date format.
 * @param {Date} start the start date of the date range in Date format.
 * @param {Date} end the end date of the date range in Date format.
 */
export const getCountryTotalsInDateRange = (data, dates, start, end) => {
    const veryFirstDate = dates[0]
    const indexStart = getDiffInDays(veryFirstDate, start)
    const indexEnd = getDiffInDays(veryFirstDate, end)
    return Object.entries(data).map(([country, stats]) => ({
        country,
        totalConfirmed: stats[indexEnd].confirmed - (indexStart === 0 ? 0 : stats[indexStart - 1].confirmed),
        totalDeaths: stats[indexEnd].deaths - (indexStart === 0 ? 0 : stats[indexStart - 1].deaths),
        totalRecovered: stats[indexEnd].recovered - (indexStart === 0 ? 0 : stats[indexStart - 1].recovered)

    }))
}

/**
 * Calculate the difference in days between date2 and date1
 * @param {Date} date1 
 * @param {Date} date2 
 */
export const getDiffInDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}

