import React, {useEffect, useState, useReducer} from 'react';
import {Timeseries, Cards, Table, DateRangePicker, CountryColorPicker} from './components'
import GlobalState, {reducer} from './components/global-state'
import {fetchData, getCountryTotalsInDateRange} from './api'
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


  const {all, dates, worldTotals, countries} = data
  const {countryToColor} = state

  const getData = async () => {
    const res = await fetchData()
    setData(res)

    setStartDate(res.dates[0])
    setEndDate(res.dates[res.dates.length - 1])
  }

  const tableRows = startDate && endDate ?
    getCountryTotalsInDateRange(all, dates, startDate, endDate) : []

  useEffect(() => {
    getData()
  }, [])

  return (
    <GlobalState initialState={state} dispatch={dispatch}>
      <div className={styles.app}>
        <h1>Covid-19 Tracker</h1>
        {/* <DateRangePicker min={dates && dates[0]} max={dates && dates[dates.length - 1]} dates={dates} /> */}

        {dates &&
          <DateRangePicker
            min={dates[0]}
            max={dates[dates.length - 1]}
            onStartChange={(date) => setStartDate(date)}
            onEndChange={(date) => setEndDate(date)} />
        }
        {/* {dates ? <Cards totals={worldTotals} lastUpdated={dates[dates.length - 1]} /> : null} */}
        <Timeseries all={all} dates={dates} dateRange={{start: startDate, end: endDate}} countries={data.countries} />

        <h2>Total Confirmed Cases by Country in Selected Date Range</h2>
        <Table rows={tableRows} columns={tableColumns} rowColorByFirstColumnMap={countryToColor} />
        <CountryColorPicker countriesMap={all} countries={data.countries} />
      </div>
    </GlobalState>
  )
}

export default App;
