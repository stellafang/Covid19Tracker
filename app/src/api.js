import axios from 'axios'

const url = 'https://pomber.github.io/covid19/timeseries.json'


export const fetchData = async () => {
    try {
        const {data} = await axios.get(url)
        const countryTotals = {}
        const worldTotals = {
            totalConfirmed: 0,
            totalDeaths: 0,
            totalRecovered: 0
        }
        let firstDate
        let lastDate
        Object.entries(data).forEach(([country, stats]) => {
            let totalConfirmed = 0
            let totalDeaths = 0
            let totalRecovered = 0

            if (!firstDate || !lastDate) {
                firstDate = stats[0].date
                lastDate = stats[stats.length - 1].date
            }

            // calculate totals for each country
            stats.forEach(({confirmed, deaths, recovered}) => {
                totalConfirmed += confirmed
                totalDeaths += deaths
                totalRecovered += recovered
            })
            countryTotals[country] = {
                totalConfirmed,
                totalDeaths,
                totalRecovered
            }

            worldTotals.totalConfirmed += totalConfirmed
            worldTotals.totalDeaths += totalDeaths
            worldTotals.totalRecovered += totalRecovered
        })

        console.log(new Date(firstDate))

        return {
            all: data,
            countryTotals,
            worldTotals,
            firstDate,
            lastDate
        }
    } catch (err) {
        console.error(err)
    }
}

