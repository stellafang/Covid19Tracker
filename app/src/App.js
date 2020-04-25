import React, {useEffect, useState} from 'react';
import {Timeseries, Cards} from './components'
import {fetchData} from './api'
import styles from './app.module.css'

// Use contextAPI to maintain global state for country colors?! 
// create new component for global state Provider (use React.Fragment to wrap rest of app)


const App = () => {
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
    <div className={styles.app}>
      <h1>Covid-19 Tracker</h1>
      <Cards totals={data.worldTotals} lastUpdated={data.lastDate}></Cards>
      <Timeseries all={data.all} />
    </div>
  );
}

export default App;
