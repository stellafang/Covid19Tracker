import React, {useEffect, useState, useReducer} from 'react';
import {Timeseries, Cards, CustomTable, DatePicker} from './components'
import GlobalState, {reducer} from './components/global-state'
import {fetchData} from './api'
import styles from './app.module.css'

// Use contextAPI to maintain global state for country colors?! 
// create new component for global state Provider (use React.Fragment to wrap rest of app)

const initialState = {
  selectedCountries: null,
  dateRange: {
    start: new Date('2020-01-22'),
    end: new Date('2020-03-22')
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [data, setData] = useState({})

  const getData = async () => {
    const res = await fetchData()
    setData(res)
    console.log(res)
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
          <Cards totals={data.worldTotals} lastUpdated={data.lastDate}></Cards>

          <Timeseries all={data.all} />
          <CustomTable countryTotals={data.countryTotals} />
        </div>
      </div>
    </GlobalState>
  );
}

export default App;
