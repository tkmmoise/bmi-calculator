import React from "react";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import '../../App.css'
import Header from '../Header'
import Login from '../Login'
import SignUp from '../SignUp'
import Welcome from '../Welcome'
import ErrorPage from '../ErrorPage'
import ForgotPassword from '../ForgotPassword'

const App = () => {
  return (
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
  )
    
};

export default App;
