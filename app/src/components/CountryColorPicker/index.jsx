import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import CountryPicker from '../../components/CountryPicker'
import {Button} from '@material-ui/core'
import {GlobalDispatchContext, SET_COUNTRY_TO_COLOR} from '../global-state'
import styles from './index.module.css'
import ColorPicker from '../../components/ColorPicker/index.jsx'

const CountryColorPicker = (props) => {
    const dispatch = useContext(GlobalDispatchContext)
    const defaultColor = '#000000'
    const [country, setCountry] = useState('')
    const [color, setColor] = useState('')
    const {countriesMap} = props

    const submit = (color, country) => {
        if (color && country) {
            dispatch({
                type: SET_COUNTRY_TO_COLOR, payload: {
                    country,
                    color
                }
            })
        }
    }

    const handleChange = (selectedCountry) => {
        console.log('select country: ', selectedCountry)
        setCountry(selectedCountry)
    };

    const onSelectColor = (selectedColor) => {
        console.log('select color: ', selectedColor)
        setColor(selectedColor)
    }

    return (
        <div className={styles.root}>
            <CountryPicker countriesMap={countriesMap} handleChange={handleChange} />
            <ColorPicker defaultColor={defaultColor} onSelectColor={onSelectColor} />
            <Button variant="contained" onClick={() => submit(color, country)}>Set Color</Button>
        </div>
    )
}

CountryColorPicker.propTypes = {
    countriesMap: PropTypes.object
}

export default CountryColorPicker