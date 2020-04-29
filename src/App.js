import React, {useReducer} from 'react';
import GlobalState from './global-state'
import reducer from './global-state/reducer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {HomePage, SettingsPage} from './pages'

// Initial dates are from today and 2 months back.
const startDate = new Date()
startDate.setDate(startDate.getDate() - 1)
startDate.setMonth(startDate.getMonth() - 2)
const endDate = new Date()
endDate.setDate(endDate.getDate() - 1)

// Initial countries to display.
const selectedCountries = ['Afghanistan', 'Canada', 'China']

const initialState = {
  countryToColor: {},
  selectedCountries,
  dateRange: {
    start: new Date(startDate),
    end: new Date(endDate)
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Router>
      <GlobalState initialState={state} dispatch={dispatch}>
        <Switch>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </GlobalState>
    </Router>
  )
}


export default App