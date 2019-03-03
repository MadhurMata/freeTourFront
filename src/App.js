import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import TourDetail from './pages/TourDetail';
import ParentCreate from './pages/ParentCreate';
import AuthProvider from './components/AuthProvider';
import Map from './components/Map';
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
            <PrivateRoute exact path="/map" component={Map} />
            <PrivateRoute exact path="/user/profile" component={Profile} />
            <PrivateRoute exact path="/tour/create" component={ParentCreate} />
            <PrivateRoute exact path="/tour/:id" component={TourDetail} />
            <PrivateRoute exact path="/tour/:id/edit" component={Edit} />

          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
