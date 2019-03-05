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
import TourNavigator from './pages/TourNavigator';
import AuthProvider from './components/AuthProvider';
import EditProfile from './pages/EditProfile';
import Profile2 from './pages/Profile2';
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
            <PrivateRoute exact path="/Profile2" component={Profile2} />
            <PrivateRoute exact path="/user/profile" component={Profile} />
            <PrivateRoute exact path="/tour/create" component={ParentCreate} />
            <PrivateRoute exact path="/tour/:id/navigator" component={TourNavigator} />
            <PrivateRoute exact path="/tour/:id" component={TourDetail} />
            <PrivateRoute exact path="/tour/:id/edit" component={Edit} />
            <PrivateRoute exact path="/user/profile/:id/edit" component={EditProfile} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
