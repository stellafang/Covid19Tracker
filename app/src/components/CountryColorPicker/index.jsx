import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import CountryPicker from '../../components/CountryPicker'
import {Button, Grid} from '@material-ui/core'
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

    return (
        <div className={styles.root}>
            <div className={styles.child}>
                <CountryPicker countriesMap={countriesMap} handler={(newCountry) => setCountry(newCountry)} />
            </div>

            <div className={styles.child}>
                <ColorPicker defaultColor={defaultColor} handler={(newColor) => setColor(newColor)} />
            </div>
            <div className={styles.child}>
                <Button variant="contained" onClick={() => submit(color, country)}>Set Color</Button>
            </div>
        </div>
    )
}

CountryColorPicker.propTypes = {
    countriesMap: PropTypes.object
}

export default CountryColorPicker