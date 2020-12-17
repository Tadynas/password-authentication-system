import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import SignIn from '../components/SignInPage'
import SignUp from '../components/SignUpPage'


const AppRouter = () => (
  <Router>
    <div>
      <Switch>
          <Route path="/" component={SignIn} exact={true} />
          <Route path="/signup" component={SignUp} />
        </Switch>
    </div>
  </Router>
)

export default AppRouter