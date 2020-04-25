import React from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-chartjs-2'
import styles from './index.module.css'

const Timeseries = (props) => {
    const {all} = props
    if (!all) return '...Loading'
    const dates = []
    const datasets = Object.entries(all).map(([country, stats]) => {
        if (dates.length !== stats.length) {
            stats.forEach((stat) => dates.push(stat.date))
        }
        return {
            data: stats.map((stat) => stat.confirmed),
            label: country,
            // borderColor: 'red',
            // fill: true
        }
    })
    console.log('dates ', datasets)

    return (
        <div className={styles.timeseries}>
            {all ? <Line classNames
                data={{
                    labels: dates,
                    datasets: datasets
                }}
                legend={{
                    display: false
                }}
            /> : null}
        </div>

    )
}

Timeseries.propTypes = {
    all: PropTypes.object
}
export default Timeseries