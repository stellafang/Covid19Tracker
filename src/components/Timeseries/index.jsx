import React, {useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Chart, Line} from 'react-chartjs-2'
import styles from './index.module.css'
import ItemPicker from '../../components/ItemPicker'
import SkeletonBlock from '../../components/SkeletonBlock'
import {GlobalStateContext, GlobalDispatchContext} from '../../global-state'
import {SET_SELECTED_COUNTRIES} from '../../global-state/actions'
import {getDiffInDays, toReadableDates, getSubsetDates} from '../../utils'

const fontColor = 'Gray'
const fontFamily = 'Georgia'

const Timeseries = (props) => {
    const {countries, datapoints, dates} = props
    const globalState = useContext(GlobalStateContext)
    const dispatch = useContext(GlobalDispatchContext)

    const {selectedCountries, countryToColor, dateRange} = globalState || {}

    let datapointsSubset

    if (datapoints) {
        let startDateIndex = dates && getDiffInDays(dates[0], dateRange.start)
        let endDateIndex = dates && getDiffInDays(dates[0], dateRange.end) + 1
        datapointsSubset = JSON.parse(JSON.stringify(Object.assign({}, datapoints)))
        countries.forEach((country) => {
            datapointsSubset[country] = datapointsSubset[country].splice(startDateIndex, endDateIndex)
        })
    }

    const setSelectedCountries = (selected) => {
        dispatch({
            type: SET_SELECTED_COUNTRIES,
            payload: selected
        })
    }

    useEffect(() => {
        Chart.pluginService.register({
            beforeDraw: ((c, opts) => responsiveChartSizing(c))
        })
    }, [])

    return (
        <div className={styles.timeseries}>
            {countries ? <div className={styles.countryPicker}>
                <ItemPicker
                    label='Country'
                    items={countries}
                    handler={(v) => setSelectedCountries(v)}
                    multiple={true}
                    defaultSelected={selectedCountries} />
            </div> : <SkeletonBlock />}

            {datapointsSubset ? <Line classNames
                data={{
                    labels: toReadableDates(getSubsetDates(dates, dateRange.start, dateRange.end)),
                    datasets: selectedCountries.map((country) => ({
                        data: datapointsSubset[country],
                        label: country,
                        borderColor: countryToColor[country] || '#000000',
                    }))
                }}
                options={{
                    title: {
                        display: true,
                        text: 'Total # of Confirmed Cases per Country',
                        fontFamily,
                        fontStyle: 'normal'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: '# of Confirmed Cases',
                                fontFamily,
                                fontColor,
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Date',
                                fontFamily,
                                fontColor,
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

            /> : <SkeletonBlock />}
        </div>

    )
}

Timeseries.propTypes = {
    /**
     * Countries mapped to a list of confirmed cases arranged 
     * by ascending date.
     */
    datapoints: PropTypes.object,

    /**
     * List of valid countries.
     */
    countries: PropTypes.array,

    /**
     * List of valid dates.
     */
    dates: PropTypes.array,

    /**
     * List of selected countries to show on the timeseries.
     */
    defaultSelected: PropTypes.array

}

// `react-chartjs-2` is limited in the way it can be configured to be responsive. 
// Currently it is done by modifying the chart through a callback before it is
// drawn or redrawn. This can hamper performance **
const responsiveChartSizing = (c) => {
    const height = c.chart.height
    const width = c.chart.width
    if (c.height < 800 || c.width < 600) {
        c.scales['y-axis-0'].options.scaleLabel.fontSize = Math.min(height * 5 / 200, width * 5 / 200)
        c.scales['x-axis-0'].options.scaleLabel.fontSize = Math.min(height * 5 / 200, width * 5 / 200)
        c.scales['x-axis-0'].options.ticks.maxTicksLimit = width / 100
        c.scales['y-axis-0'].options.ticks.maxTicksLimit = height / 50
        c.scales['x-axis-0'].options.ticks.minor.fontSize = Math.min(width * 5 / 100, 10)
        c.scales['y-axis-0'].options.ticks.minor.fontSize = Math.min(height * 5 / 100, 10)
        c.titleBlock.options.fontSize = Math.min(width * 5 / 100, height * 5 / 100, 25)
        c.legend.options.labels.fontSize = Math.min(width * 5 / 200, height * 5 / 100, 15)
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