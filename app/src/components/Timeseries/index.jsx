import React, {useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Chart, Line} from 'react-chartjs-2'
import styles from './index.module.css'
import ItemPicker from '../../components/ItemPicker'
import {GlobalStateContext} from '../global-state'
import {toReadableDates, getDiffInDays, getSubsetDates} from '../../utils'

const Timeseries = (props) => {
    const globalState = useContext(GlobalStateContext)
    const defaultCountries = ['Canada', 'China']
    const [countries, setCountries] = React.useState(defaultCountries);
    const {all, dateRange} = props
    let dates = props.dates

    let startDateIndex = dates && getDiffInDays(dates[0], dateRange.start)
    let endDateIndex = dates && getDiffInDays(dates[0], dateRange.end) + 1

    const handleChange = (selectedCountries) => {
        setCountries(selectedCountries)
    };

    useEffect(() => {
        Chart.pluginService.register({
            beforeDraw: ((c, opts) => responsiveChartSizing(c))
        })
    }, [setCountries, props.dateRange, globalState.countryToColor])

    return (
        <div className={styles.timeseries}>
            {props.countries && <div className={styles.countryPicker}>
                <ItemPicker label='Country' items={props.countries} handler={handleChange} multiple={true} defaultSelected={defaultCountries} />
            </div>}

            {all ? <Line classNames
                data={{
                    labels: toReadableDates(getSubsetDates(dates, dateRange.start, dateRange.end)),
                    datasets: countries.map((country) => ({
                        data: all[country].slice(startDateIndex, endDateIndex).map(({confirmed}) => confirmed),
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

const responsiveChartSizing = (c) => {
    const height = c.chart.height
    const width = c.chart.width
    if (c.height < 800 || c.width < 600) {
        c.scales['y-axis-0'].options.scaleLabel.fontSize = height * 5 / 200
        c.scales['x-axis-0'].options.scaleLabel.fontSize = width * 5 / 200
        c.scales['x-axis-0'].options.ticks.maxTicksLimit = width / 100
        c.scales['y-axis-0'].options.ticks.maxTicksLimit = height / 50
        c.scales['x-axis-0'].options.ticks.minor.fontSize = Math.min(width * 5 / 100, 10)
        c.scales['y-axis-0'].options.ticks.minor.fontSize = Math.min(height * 5 / 100, 10)
        c.titleBlock.options.fontSize = Math.min(width * 5 / 200, height * 5 / 100)
        c.legend.options.labels.fontSize = Math.min(width * 5 / 200, height * 5 / 100)
        c.scales['x-axis-0'].options.ticks.maxRotation = 0
    } else {
        c.scales['y-axis-0'].options.scaleLabel.fontSize = 25
        c.scales['x-axis-0'].options.scaleLabel.fontSize = 25
        c.scales['x-axis-0'].options.ticks.minor.fontSize = 10
        c.scales['y-axis-0'].options.ticks.minor.fontSize = 10
        c.scales['x-axis-0'].options.ticks.maxTicksLimit = 30
        c.scales['y-axis-0'].options.ticks.maxTicksLimit = 30
        c.scales['x-axis-0'].options.ticks.maxRotation = 30
        c.titleBlock.options.fontSize = 25
        c.legend.options.labels.fontSize = 15
    }
}

export default Timeseries