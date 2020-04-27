import React, {useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Chart, Line} from 'react-chartjs-2'
import styles from './index.module.css'
import ItemPicker from '../../components/ItemPicker'
import {GlobalStateContext} from '../../global-state'

const fontColor = 'Gray'
const fontFamily = 'Georgia'

// TODO: Create skeleton block
const Timeseries = (props) => {
    const {countries, datapoints, dates, defaultSelected} = props
    const globalState = useContext(GlobalStateContext)
    const [selected, setSelected] = React.useState(defaultSelected);

    useEffect(() => {
        Chart.pluginService.register({
            beforeDraw: ((c, opts) => responsiveChartSizing(c))
        })
    }, [setSelected, props.dateRange, globalState.countryToColor])

    return (
        <div className={styles.timeseries}>
            {countries && <div className={styles.countryPicker}>
                <ItemPicker
                    label='Country'
                    items={countries}
                    handler={(v) => setSelected(v)}
                    multiple={true}
                    defaultSelected={defaultSelected} />
            </div>}

            {datapoints && dates && <Line classNames
                data={{
                    labels: dates,
                    datasets: selected.map((country) => ({
                        data: datapoints[country],
                        label: country,
                        borderColor: globalState.countryToColor[country] || '#000000',
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

            />}
        </div>

    )
}

Timeseries.propTypes = {
    /**
     * Countries mapped to a list of confirmed cases arranged 
     * by ascending date.
     */
    datapoints: PropTypes.object.isRequired,

    /**
     * List of valid countries.
     */
    countries: PropTypes.array.isRequired,

    /**
     * List of valid dates.
     */
    dates: PropTypes.array.isRequired,

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