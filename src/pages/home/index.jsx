import React, {useEffect, useState, useContext} from 'react'
import {Timeseries, Cards, Table, DateRangePicker, SkeletonBlock} from '../../components'
import {GlobalStateContext, GlobalDispatchContext} from '../../global-state'
import {fetchData, getCountryTotalsInDateRange} from '../../api'
import styles from './index.module.css'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {SET_DATE_RANGE} from '../../global-state/actions'

const tableColumns = [
    {id: 'country', label: 'Country'},
    {id: 'totalConfirmed', label: 'Confirmed'},
    {id: 'totalDeaths', label: 'Death'},
    {id: 'totalRecovered', label: 'Recovered'},
]

const Home = () => {
    const state = useContext(GlobalStateContext)
    const dispatch = useContext(GlobalDispatchContext)
    const [data, setData] = useState(null)
    const {countryToColor, dateRange} = state
    const {all, dates, worldTotals, confirmedCasesByCountry, countries} = data || {}

    const setDateRange = (start, end) => {
        dispatch({
            type: SET_DATE_RANGE,
            payload: {
                start,
                end
            }
        })
    }

    useEffect(() => {
        const getData = async () => {
            const res = await fetchData()
            setData(res)
        }
        getData()
    }, [])

    return (
        <div className={styles.home}>
            <h1>Covid-19 Tracker</h1>
            <Cards totals={worldTotals} />
            <h4>Date Range in View</h4>
            {data ?
                <DateRangePicker
                    min={dates[0]}
                    max={dates[dates.length - 1]}
                    onStartChange={(date) => setDateRange(date, null)}
                    onEndChange={(date) => setDateRange(null, date)}
                    selectedStart={dateRange.start}
                    selectedEnd={dateRange.end} />
                : <SkeletonBlock height={'70px'} />
            }

            <Timeseries
                datapoints={confirmedCasesByCountry}
                dates={dates}
                countries={countries} />


            <h2>Total Confirmed Cases by Country in Selected Date Range</h2>
            {
                data ?
                    <Table
                        rows={getCountryTotalsInDateRange(all, dates, dateRange.start, dateRange.end)}
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