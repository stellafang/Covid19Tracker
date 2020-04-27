import React, {useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Chart, Line} from 'react-chartjs-2'
import styles from './index.module.css'
import {getDiffInDays} from '../../api'
import CountryPicker from '../../components/CountryPicker'
import {GlobalStateContext} from '../global-state'


const Timeseries = (props) => {
    const globalState = useContext(GlobalStateContext)
    const defaultCountries = ['Canada', 'China']
    const [countries, setCountries] = React.useState(defaultCountries);
    const {all, dateRange} = props
    let dates = props.dates

    let startDateIndex
    let endDateIndex
    let datesToInclude
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (dates && dates.length > 0) {
        startDateIndex = getDiffInDays(dates[0], dateRange.start)
        endDateIndex = getDiffInDays(dates[0], dateRange.end) + 1
        dates = dates.map((date) => {
            const month = date.getMonth()
            const day = date.getDate()
            return `${months[month]} ${day}`
        })
        datesToInclude = dates.slice(startDateIndex, endDateIndex)
    }


    const handleChange = (selectedCountries) => {
        setCountries(selectedCountries)
    };

    const responsiveChartSizing = (c) => {
        const height = c.chart.height
        const width = c.chart.width
        if (c.height < 600 || c.width < 600) {
            c.scales['y-axis-0'].options.scaleLabel.fontSize = height * 5 / 200
            c.scales['x-axis-0'].options.scaleLabel.fontSize = width * 5 / 200
            c.scales['x-axis-0'].options.ticks.maxTicksLimit = width / 100
            c.scales['x-axis-0'].options.ticks.minor.fontSize = Math.min(width * 5 / 100, 10)
            c.scales['y-axis-0'].options.ticks.minor.fontSize = Math.min(height * 5 / 100, 10)
            c.titleBlock.options.fontSize = width * 5 / 200
            c.legend.options.labels.fontSize = width * 5 / 200
            c.scales['x-axis-0'].options.ticks.maxRotation = 0
        } else {
            c.scales['y-axis-0'].options.scaleLabel.fontSize = 25
            c.scales['x-axis-0'].options.scaleLabel.fontSize = 25
            c.scales['x-axis-0'].options.ticks.minor.fontSize = 10
            c.scales['y-axis-0'].options.ticks.minor.fontSize = 10
            c.scales['x-axis-0'].options.ticks.maxTicksLimit = 30
            c.scales['x-axis-0'].options.ticks.maxRotation = 30
            c.titleBlock.options.fontSize = 28
            c.legend.options.labels.fontSize = 20
        }
    }
    useEffect(() => {
        Chart.pluginService.register({
            beforeDraw: ((c, opts) => responsiveChartSizing(c))
        })
    }, [setCountries, props.dateRange, globalState.countryToColor])

    return (
        <div className={styles.timeseries}>
            <CountryPicker countriesMap={all} handler={handleChange} multiple={true} default={defaultCountries} />
            {all ? <Line classNames
                data={{
                    labels: datesToInclude.map((date) => date),
                    datasets: countries.map((country) => ({
                        data: all[country].slice(startDateIndex, endDateIndex).map((stat) => stat.confirmed),
                        label: country,
                        borderColor: globalState.countryToColor[country] || '#000000',
                    }))
                }}
                options={{
                    title: {
                        display: true,
                        text: 'Total # of Confirmed Cases per Country',
                        fontFamily: 'Georgia',
                        fontStyle: 'normal'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: '# of Confirmed Cases',
                                fontFamily: 'Georgia',
                                fontColor: 'Gray'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Date',
                                fontFamily: 'Georgia',
                                fontFamily: 'Georgia',
                                fontColor: 'Gray',
                            }
                        }]
                    },
                    maintainAspectRatio: false,
                    onResize: ((c) => responsiveChartSizing(c)),
                    legend: {
                        display: true,
                        labels: {
                            position: 'right',
                            usePointStyle: true,
                        }

                    },
                }}

            /> : null}
        </div>

    )
}

Timeseries.propTypes = {
    all: PropTypes.object
}
export default Timeseries