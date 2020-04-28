import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import {InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';

const ItemPicker = (props) => {
    const {defaultSelected, multiple, handler, items, label} = props
    const [selected, setSelected] = useState(defaultSelected || (multiple ? [] : ''))

    const handleChange = (event) => {
        const val = event.target.value
        if (val === 'None') return
        setSelected(val)
        handler(val)
    };

    useEffect(() => {
    }, [items])

    return (
        <div className={styles.root}>
            <FormControl size='small' fullWidth={true} variant="outlined">
                <InputLabel>{label}</InputLabel>
                {
                    <Select
                        className={styles.selectMenu}
                        value={selected}
                        onChange={handleChange}
                        label={label}
                        multiple={multiple}
                    >
                        {
                            items ? items.map((item) => (
                                <MenuItem value={item} key={item}>{item}</MenuItem>
                            )) : <MenuItem value=""><em>None</em></MenuItem>
                        }
                    </Select>
                }
            </FormControl>
        </div>
    )
}

ItemPicker.propTypes = {

    /**
     * items to populate the item picker.
     */
    items: PropTypes.array.isRequired,

    /**
     * onChange callback that is provided with the country selected.
     * Recieve all countries selected so far if `multiple=true`.
     */
    handler: PropTypes.func,

    /**
     * A valid default item or items.
     */
    defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

    /**
     * Allow multiple items to be selected.
     * Default: false.
     */
    multiple: PropTypes.bool
}

export default ItemPicker