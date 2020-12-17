import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AuthenticationPage from '../components/AuthenticationPage'



const AppRouter = () => (
  <Router>
    <div>
      <Switch>
          <Route path="/" exact={true}>
            <AuthenticationPage signUp={false} />
          </Route>
          <Route path="/signup">
            <AuthenticationPage signUp={true} />
          </Route>
        </Switch>
    </div>
  </Router>
)

export default AppRouter