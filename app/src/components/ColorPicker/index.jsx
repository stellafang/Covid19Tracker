import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import {ChromePicker} from 'react-color'
import useComponentVisible from '../useComponentVisible.jsx'

const ColorPicker = (props) => {
    const {defaultColor, onSelectColor} = props
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [color, setColor] = useState(defaultColor)

    const toggleVisibility = () => {
        setIsComponentVisible(!isComponentVisible)
    }
    const selectColor = ({hex}) => {
        setColor(hex)
        onSelectColor(hex)
    }

    return (
        <div className={styles.root} ref={ref}>
            <div className={styles.preview} style={{backgroundColor: color}} />
            <input
                className={styles.text}
                type='text'
                name='color-picker-text'
                value={color}
                onClick={toggleVisibility}
                readOnly={true} />
            <div className={styles.palette}>
                {isComponentVisible &&
                    <ChromePicker
                        color={color}
                        onChange={selectColor} />
                }
            </div>
        </div>
    )
}

ColorPicker.propTypes = {
    /**
     * RGB code
     */
    defaultColor: PropTypes.string
}

export default ColorPicker