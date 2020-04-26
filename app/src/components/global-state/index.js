import React from "react";
import PropTypes from "prop-types";

// Set up global contexts
export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

// Actions
export const SET_DATE_RANGE = "SET_DATE_RANGE";

// Reducer
export const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_DATE_RANGE: {
            return {
                ...state,
                dateRange: payload
            };
        }
        default:
            return state;
    }
};

function GlobalState(props) {
    const {initialState, dispatch} = props;
    return (
        <GlobalStateContext.Provider value={initialState}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {props.children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
}

GlobalState.propTypes = {
    // The state returned from setting up the reducer using React Hook `useReducer`.
    initialState: PropTypes.object.isRequired,

    // The dispatch function returned from setting up the reducer using React Hook `useReducer`.
    dispatch: PropTypes.func.isRequired,

    children: PropTypes.node
};

export default GlobalState;