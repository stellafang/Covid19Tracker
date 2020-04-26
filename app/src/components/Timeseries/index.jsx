import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Line} from 'react-chartjs-2'
import styles from './index.module.css'
import {getDiffInDays} from '../../api'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const Timeseries = (props) => {
    const [country, setCountry] = React.useState('Canada');
    const {all, dates, dateRange} = props

    let startDateIndex
    let endDateIndex
    let datesToInclude
    if (dates && dates.length > 0) {
        startDateIndex = getDiffInDays(dates[0], dateRange.start)
        endDateIndex = getDiffInDays(dates[0], dateRange.end) + 1
        datesToInclude = dates.slice(startDateIndex, endDateIndex)
    }


    const handleChange = (event) => {
        setCountry(event.target.value);
    };

    useEffect(() => {
    }, [setCountry, props.dateRange])

    return (
        <div className={styles.timeseries}>
            <FormControl variant="outlined" className={styles.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={country}
                    onChange={handleChange}
                    label="Country"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        all ? Object.keys(all).map((country) => (
                            <MenuItem value={country} key={country}>{country}</MenuItem>
                        )) : null
                    }
                </Select>
            </FormControl>
            {all ? <Line classNames
                data={{
                    labels: datesToInclude.map((date) => date.toDateString()),
                    datasets: [{
                        data: all[country].slice(startDateIndex, endDateIndex).map((stat) => stat.confirmed),
                        label: country
                    }]
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