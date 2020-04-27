import React, {useEffect, useState, useReducer} from 'react';
import {Timeseries, Cards, Table, DateRangePicker, CountryColorPicker} from './components'
import GlobalState from './global-state'
import reducer from './global-state/reducer'
import {fetchData, getCountryTotalsInDateRange} from './api'
import {getDiffInDays, toReadableDates, getSubsetDates} from './utils'
import styles from './app.module.css'

const initialState = {
  countryToColor: {}
}

const tableColumns = [
  {id: 'country', label: 'Country'},
  {id: 'totalConfirmed', label: 'Confirmed'},
  {id: 'totalDeaths', label: 'Death'},
  {id: 'totalRecovered', label: 'Recovered'},
]

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
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
    <GlobalState initialState={state} dispatch={dispatch}>
      <div className={styles.app}>
        <h1>Covid-19 Tracker</h1>
        {dates &&
          <DateRangePicker
            min={dates[0]}
            max={dates[dates.length - 1]}
            onStartChange={(date) => setStartDate(date)}
            onEndChange={(date) => setEndDate(date)} />
        }
        {/* {dates ? <Cards totals={worldTotals} lastUpdated={dates[dates.length - 1]} /> : null} */}
        {dates && timeSeriesSubset &&
          <Timeseries
            datapoints={timeSeriesSubset}
            dates={toReadableDates(getSubsetDates(dates, startDate, endDate))}
            countries={data.countries}
            defaultSelected={['Canada', 'China']} />
        }

        <h2>Total Confirmed Cases by Country in Selected Date Range</h2>
        {startDate && endDate &&
          <Table
            rows={getCountryTotalsInDateRange(all, dates, startDate, endDate)}
            columns={tableColumns}
            rowColorByFirstColumnMap={countryToColor} />
        }
        <CountryColorPicker countries={data.countries} />
      </div>
    </GlobalState>
  )
}

export default App;
