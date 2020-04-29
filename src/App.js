import React, {useReducer} from 'react';
import GlobalState from './global-state'
import reducer from './global-state/reducer'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {HomePage, SettingsPage} from './pages'

const initialState = {
  countryToColor: {}
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