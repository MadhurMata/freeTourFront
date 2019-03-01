import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import TourDetail from './pages/TourDetail';
import CreateTour from './pages/CreateTour';
import AuthProvider from './components/AuthProvider';
import Edit from './pages/Edit';
import './style.css';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/tour/create" component={CreateTour} />
            <PrivateRoute exact path="/tour/profile" component={Profile} />
            <PrivateRoute exact path="/tour/:id" component={TourDetail} />
            <PrivateRoute exact path="/tour/:id/edit" component={Edit} />

          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
