import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import {ChromePicker} from 'react-color'
import useComponentVisible from '../../components/ClickOutsideDetector'

const ColorPicker = (props) => {
    const {defaultColor, handler} = props
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [color, setColor] = useState(defaultColor)

    const toggleVisibility = () => {
        setIsComponentVisible(!isComponentVisible)
    }
    const selectColor = ({hex}) => {
        setColor(hex)
        handler(hex)
    }

    return (
        <div className={styles.root} ref={ref}>
            <div className={styles.preview} style={{backgroundColor: color}} />
            <input
                className={styles.text}
                type='text'
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
     * The color to initialize the Color Picker with in RGB code.
     */
    defaultColor: PropTypes.string,

    /**
     * Handler called when color is selected.
     */
    handler: PropTypes.func
}

export default ColorPicker