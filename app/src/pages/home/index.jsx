import React, {useEffect, useState, useContext} from 'react'
import {Timeseries, Cards, Table, DateRangePicker, SkeletonBlock} from '../../components'
import {GlobalStateContext} from '../../global-state'
import {fetchData, getCountryTotalsInDateRange} from '../../api'
import {getDiffInDays, toReadableDates, getSubsetDates} from '../../utils'
import styles from './index.module.css'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

const tableColumns = [
    {id: 'country', label: 'Country'},
    {id: 'totalConfirmed', label: 'Confirmed'},
    {id: 'totalDeaths', label: 'Death'},
    {id: 'totalRecovered', label: 'Recovered'},
]

// TODO: Add Skeleton blocks for each component!!
// TODO: Give each country default color in api somewhere? 
const Home = () => {
    const state = useContext(GlobalStateContext)
    const [data, setData] = useState({})
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const {all, dates, worldTotals, countries, confirmedCasesByCountry} = data

    const {countryToColor} = state

    const getData = async () => {
        const res = await fetchData()
        setData(res)
        setStartDate(res.dates[0])
        setEndDate(res.dates[res.dates.length - 1])
    }

    let timeSeriesSubset

    if (confirmedCasesByCountry) {
        let startDateIndex = dates && getDiffInDays(dates[0], startDate)
        let endDateIndex = dates && getDiffInDays(dates[0], endDate) + 1
        timeSeriesSubset = JSON.parse(JSON.stringify(Object.assign({}, confirmedCasesByCountry)))
        countries.forEach((country) => {
            timeSeriesSubset[country] = timeSeriesSubset[country].splice(startDateIndex, endDateIndex)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.home}>
            <h1>Covid-19 Tracker</h1>
            <Cards totals={worldTotals} />
            <h4>Date Range in View</h4>
            {dates ?
                <DateRangePicker
                    min={dates[0]}
                    max={dates[dates.length - 1]}
                    onStartChange={(date) => setStartDate(date)}
                    onEndChange={(date) => setEndDate(date)} />
                : <SkeletonBlock height={'70px'} />
            }
            {dates && timeSeriesSubset ?
                <Timeseries
                    datapoints={timeSeriesSubset}
                    dates={toReadableDates(getSubsetDates(dates, startDate, endDate))}
                    countries={data.countries}
                    defaultSelected={['Afghanistan', 'Canada', 'China']} />
                : <SkeletonBlock height={'45vh'} />
            }

            <h2>Total Confirmed Cases by Country in Selected Date Range</h2>
            {
                startDate && endDate ?
                    <Table
                        rows={getCountryTotalsInDateRange(all, dates, startDate, endDate)}
                        columns={tableColumns}
                        rowColorByFirstColumnMap={countryToColor} />
                    : <SkeletonBlock height={'470px'} />
            }
            <Button component={Link} to='settings' variant='contained' color='primary'>
                Change Country Color
            </Button>
        </div >
    )
}

export default Home