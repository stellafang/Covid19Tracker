import React from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-chartjs-2'
import styles from './index.module.css'
import {getDiffInDays} from '../../api'

const Timeseries = (props) => {
    const {all, dates, dateRange} = props
    if (!all) return '...Loading'
    const startDateIndex = getDiffInDays(dates[0], dateRange.start)
    const endDateIndex = getDiffInDays(dates[0], dateRange.end) + 1
    const datesToInclude = dates.slice(startDateIndex, endDateIndex)
    const datasets = Object.entries(all).filter(([country, stats]) => country === 'Canada')
        .map(([country, stats]) => {
            return {
                data: stats.slice(startDateIndex, endDateIndex).map((stat) => stat.confirmed),
                label: country,
                // borderColor: 'red',
                // fill: true
            }
        })

    return (
        <div className={styles.timeseries}>
            {all ? <Line classNames
                data={{
                    labels: datesToInclude.map((date) => date.toDateString()),
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