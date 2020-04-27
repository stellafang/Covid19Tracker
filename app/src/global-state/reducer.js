import {SET_COUNTRY_TO_COLOR} from './actions'

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
        default:
            return state;
    }
}

export default reducer
