import React, {useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-chartjs-2'
import styles from './index.module.css'
import {getDiffInDays} from '../../api'
import CountryPicker from '../../components/CountryPicker'
import {GlobalStateContext} from '../global-state'


const Timeseries = (props) => {
    const globalState = useContext(GlobalStateContext)
    const defaultCountries = ['Canada', 'China']
    const [countries, setCountries] = React.useState(defaultCountries);
    const {all, dates, dateRange} = props

    let startDateIndex
    let endDateIndex
    let datesToInclude
    if (dates && dates.length > 0) {
        startDateIndex = getDiffInDays(dates[0], dateRange.start)
        endDateIndex = getDiffInDays(dates[0], dateRange.end) + 1
        datesToInclude = dates.slice(startDateIndex, endDateIndex)
    }


    const handleChange = (selectedCountries) => {
        setCountries(selectedCountries)
    };

    useEffect(() => {
    }, [setCountries, props.dateRange, globalState.countryToColor])

    return (
        <div className={styles.timeseries}>
            <CountryPicker countriesMap={all} handleChange={handleChange} multiple={true} default={defaultCountries} />
            {all ? <Line classNames
                data={{
                    labels: datesToInclude.map((date) => date.toDateString()),
                    datasets: countries.map((country) => ({
                        data: all[country].slice(startDateIndex, endDateIndex).map((stat) => stat.confirmed),
                        label: country,
                        borderColor: globalState.countryToColor[country] || '#000000',
                    }))
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