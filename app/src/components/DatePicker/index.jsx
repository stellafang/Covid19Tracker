import React, {useContext} from "react";
import {DatePicker as MaterialDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import styles from "./index.module.css";
import {GlobalStateContext, GlobalDispatchContext, SET_DATE_RANGE} from '../global-state'

function DatePicker(props) {
    const globalState = useContext(GlobalStateContext)
    const dispatch = useContext(GlobalDispatchContext)
    const {dates} = props
    const {dateRange} = globalState
    const handleStartDateChange = (date) => {
        console.log('start date changed: ', date)
        dispatch({
            type: SET_DATE_RANGE, payload: {
                start: date.toDate(), end: globalState.dateRange.end
            }
        })
    }

    const handleEndDateChange = (date) => {
        console.log('end date changed: ', date)
        dispatch({
            type: SET_DATE_RANGE, payload: {
                start: globalState.dateRange.start, end: date.toDate()
            }
        })
    }

    return (
        <div className={styles.dateRange}>
            {dateRange.start && dateRange.end ?
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <MaterialDatePicker
                        className={styles.date}
                        disableToolbar
                        variant="inline"
                        label="Start Date"
                        helperText="Choose a start date"
                        value={dateRange.start}
                        onChange={handleStartDateChange}
                        minDate={dates[0]}
                        maxDate={dates[dates.length - 1]}
                    />
                    <MaterialDatePicker
                        className={styles.date}
                        disableToolbar
                        variant="inline"
                        label="End Date"
                        helperText="Choose an end date"
                        value={dateRange.end}
                        onChange={handleEndDateChange}
                        minDate={dates[0]}
                        maxDate={dates[dates.length - 1]}
                    />
                </MuiPickersUtilsProvider> : null
            }

        </div>

    );
}

export default DatePicker