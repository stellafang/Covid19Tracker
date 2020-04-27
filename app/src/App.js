import React, {useEffect, useState, useReducer} from 'react';
import {Timeseries, Cards, Table, DatePicker, CountryColorPicker} from './components'
import GlobalState, {reducer, SET_DATE_RANGE} from './components/global-state'
import {fetchData, getCountryTotalsInDateRange} from './api'
import styles from './app.module.css'


const initialState = {
  dateRange: {
    start: null,
    end: null
  },
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
  const {all, dates, worldTotals, countries} = data
  const {dateRange, countryToColor} = state

  const getData = async () => {
    const res = await fetchData()
    setData(res)
    dispatch({
      type: SET_DATE_RANGE, payload: {
        start: res.dates[0], end: res.dates[res.dates.length - 1]
      }
    })
  }

  const tableRows = dateRange.start && dateRange.end ?
    getCountryTotalsInDateRange(all, dates, dateRange.start, dateRange.end) : []

  useEffect(() => {
    getData()
  }, [])

  return (
    <GlobalState initialState={state} dispatch={dispatch}>
      <div className={styles.app}>
        <h1>Covid-19 Tracker</h1>
        <DatePicker dates={dates} />
        {/* {dates ? <Cards totals={worldTotals} lastUpdated={dates[dates.length - 1]} /> : null} */}
        <Timeseries all={all} dates={dates} dateRange={state.dateRange} countries={countries} />

        <h2>Total Confirmed Cases by Country in Selected Date Range</h2>
        <Table rows={tableRows} columns={tableColumns} rowColorByFirstColumnMap={countryToColor} />
        <CountryColorPicker countriesMap={all} />
      </div>
    </GlobalState>
  );
}

export default App;
