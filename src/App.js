import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <h1>Basic React Authentication</h1>
          <Navbar data='data' />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
