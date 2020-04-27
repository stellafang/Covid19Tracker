import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

const CountryPicker = (props) => {
    const [country, setCountry] = useState(props.default || '')
    const {countriesMap, handler} = props

    const [countries, setCountries] = useState(props.default || [])

    const handleChange = (event) => {
        const val = event.target.value
        if (props.multiple) {
            setCountries(val);
        } else {
            setCountry(val);
        }
        handler(val)
    };

    useEffect(() => {
    }, [props.countriesMap])


    return (countriesMap ? <div className={styles.root}>
        <FormControl size='small' fullWidth='true' variant="outlined">
            <InputLabel>Country</InputLabel>
            {
                props.multiple ? <Select
                    className={styles.selectMenu}
                    value={countries}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
        </FormControl></div> : null)
}

CountryPicker.propTypes = {
    countriesMap: PropTypes.object,

    /**
     * Your own custom handler called whenever a country is selected.
     * Recieve all countries selected so far if "multiple=true".
     */
    handler: PropTypes.func,

    /**
     * A valid default country name
     */
    default: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

    /**
     * Allow multiple select. (default: false)
     */
    multiple: PropTypes.bool
}

export default CountryPicker