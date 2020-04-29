import React, {useState} from 'react'
import PropTypes from 'prop-types'
import ItemPicker from '../../components/ItemPicker'
import {Button} from '@material-ui/core'
import styles from './index.module.css'
import ColorPicker from '../../components/ColorPicker/index.jsx'
import {CardContent, Card} from '@material-ui/core'

const ItemColorPicker = (props) => {
    const {items, onSubmit} = props
    const [item, setItem] = useState('')
    const [color, setColor] = useState('')

    return (
        <Card className={styles.card}>
            <CardContent>
                <div className={styles.root}>
                    <div className={styles.child}>
                        <div className={styles.pickers}>
                            {items && <ItemPicker label='Country' items={items} handler={setItem} />}
                        </div>
                        <div className={styles.pickers}>
                            {<ColorPicker defaultColor={'#000000'} handler={setColor} />}
                        </div>
                    </div>
                    <div className={styles.button}>
                        <Button fullWidth variant="contained" onClick={() => (item && color && onSubmit(item, color))}>
                            Set Color
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

ItemColorPicker.propTypes = {
    /**
     * List of items to match colors to.
     */
    items: PropTypes.array.isRequired,

    /**
     * onClick callback when the submit button is clicked and 
     * an item from the dropdown and a color have both been seleced.
     * Recieves the (item, color).
     */
    onSubmit: PropTypes.func,
}

export default ItemColorPicker