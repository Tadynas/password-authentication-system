import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AuthenticationPage from '../components/AuthenticationPage'
import CompletePage from '../components/CompletePage'



const AppRouter = () => (
  <Router>
    <div>
      <Switch>
          <Route path="/" exact={true}>
            <AuthenticationPage signUp={false} />
          </Route>
          <Route path="/complete">
            <CompletePage signUp={false} />
          </Route>
          <Route path="/signup" exact={true}>
            <AuthenticationPage signUp={true} />
          </Route>
          <Route path="/signup/complete">
            <CompletePage signUp={true} />
          </Route>
        </Switch>
    </div>
  </Router>
)

export default AppRouter