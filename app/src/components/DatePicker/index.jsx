import React, {useContext} from "react";
import {DatePicker as MaterialDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import styles from "./index.module.css";
import {GlobalStateContext, GlobalDispatchContext, SET_DATE_RANGE} from '../global-state'

function DatePicker(props) {
    const globalState = useContext(GlobalStateContext)
    const {dateRange} = globalState
    const dispatch = useContext(GlobalDispatchContext)


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
        <div className={styles.date}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <MaterialDatePicker
                    disableToolbar
                    variant="inline"
                    label="Start Date"
                    helperText="Choose a start date"
                    value={dateRange.start}
                    onChange={handleStartDateChange}
                    minDate={new Date('2020-01-22')}
                    maxDate={new Date('2020-04-25')}
                />

                <MaterialDatePicker
                    disableToolbar
                    variant="inline"
                    label="End Date"
                    helperText="Choose an end date"
                    value={dateRange.end}
                    onChange={handleEndDateChange}
                    minDate={new Date('2020-01-22')}
                    maxDate={new Date('2020-04-25')}
                />
            </MuiPickersUtilsProvider>
        </div>

    );
}

export default DatePicker