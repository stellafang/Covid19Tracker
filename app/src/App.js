import React, {useEffect, useState, useReducer} from 'react';
import {Timeseries, Cards, CustomTable, DatePicker} from './components'
import GlobalState, {reducer, SET_DATE_RANGE} from './components/global-state'
import {fetchData, getCountryTotalsInDateRange} from './api'
import styles from './app.module.css'

// Use contextAPI to maintain global state for country colors?! 
// create new component for global state Provider (use React.Fragment to wrap rest of app)

const initialState = {
  selectedCountries: null,
  dateRange: {
    start: null,
    end: null
  },
  countryColors: {
    //default
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [data, setData] = useState({})
  const {all, dates, worldTotals} = data


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
        <DatePicker />
        <div className={styles.content}>
          <h1>Covid-19 Tracker</h1>
          {/* {dates ? <Cards totals={worldTotals} lastUpdated={dates[dates.length - 1]} /> : null} */}
          <Timeseries all={all} dates={dates} dateRange={state.dateRange} />
          <CustomTable countryTotals={state.dateRange.start && state.dateRange.end ?
            getCountryTotalsInDateRange(all, dates, state.dateRange.start, state.dateRange.end) : []
          } />
        </div>
      </div>
    </GlobalState>
  );
}

export default App;
