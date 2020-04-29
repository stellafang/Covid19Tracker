import {SET_COUNTRY_TO_COLOR, SET_DATE_RANGE, SET_SELECTED_COUNTRIES} from './actions'

const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_COUNTRY_TO_COLOR: {
            const {country, color} = payload
            return {
                ...state,
                countryToColor: {
                    ...state.countryToColor,
                    [country]: color
                }
            }
        }
        case SET_DATE_RANGE: {
            const {start, end} = payload
            return {
                ...state,
                dateRange: {
                    start: start || state.dateRange.start,
                    end: end || state.dateRange.end
                }
            }
        }
        case SET_SELECTED_COUNTRIES: {
            return {
                ...state,
                selectedCountries: [...payload]
            }
        }
        default:
            return state;
    }
}

export default reducer
