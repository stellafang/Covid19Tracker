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

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [data, setData] = useState({})
  const {all, dates, worldTotals, countries} = data

  const getData = async () => {
    const res = await fetchData()
    setData(res)
    dispatch({
      type: SET_DATE_RANGE, payload: {
        start: res.dates[0], end: res.dates[res.dates.length - 1]
      }
    })
  }


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
        <Table countryTotals={state.dateRange.start && state.dateRange.end ?
          getCountryTotalsInDateRange(all, dates, state.dateRange.start, state.dateRange.end) : []
        } />

        <CountryColorPicker countriesMap={all} />
      </div>
    </GlobalState>
  );
}

export default App;
