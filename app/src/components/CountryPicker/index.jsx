import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

const CountryPicker = (props) => {
    const [country, setCountry] = useState(props.default || '')
    const {countriesMap, handleChange} = props

    const [countries, setCountries] = useState(props.default || [])

    const handler = (event) => {
        const val = event.target.value
        if (props.multiple) {
            setCountries(val);
        } else {
            setCountry(val);
        }
        handleChange(val)
    };

    useEffect(() => {
    }, [props.countriesMap])


    return (countriesMap ? <FormControl variant="outlined" className={styles.root}>
        <InputLabel>Country</InputLabel>
        {
            props.multiple ? <Select
                className={styles.selectMenu}
                value={countries}
                onChange={handler}
                label="Country"
                multiple={true}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    countriesMap ? Object.keys(countriesMap).map((country) => (
                        <MenuItem value={country} key={country}>{country}</MenuItem>
                    )) : null
                }
            </Select> : <Select
                className={styles.selectMenu}
                value={country}
                onChange={handler}
                label="Country"
            >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        countriesMap ? Object.keys(countriesMap).map((country) => (
                            <MenuItem value={country} key={country}>{country}</MenuItem>
                        )) : null
                    }
                </Select>
        }
        {/* <Select
            className={styles.selectMenu}
            value={countries}
            onChange={handler}
            label="Country"
            multiple={true}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {
                countriesMap ? Object.keys(countriesMap).map((country) => (
                    <MenuItem value={country} key={country}>{country}</MenuItem>
                )) : null
            }
        </Select> */}
    </FormControl> : null)
}

CountryPicker.propTypes = {
    countriesMap: PropTypes.object,

    /**
     * Your own custom handle change function that returns either
     * the country selected if multiple is set to false or
     * all the countries selected if multiple is set to true.
     */
    handleChange: PropTypes.func,

    /**
     * A valid default country name
     */
    default: PropTypes.string,

    /**
     * Allow multiple select. (default: false)
     */
    multiple: PropTypes.bool
}

export default CountryPicker