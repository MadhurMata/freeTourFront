import React, { Component } from "react";
import { withAuth } from "../components/AuthProvider";
import {Link} from 'react-router-dom';


class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props
      .login({ username, password })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="flex-column backfground">
        <h1>Tour.me</h1>
        <form className="flex-column" onSubmit={this.handleFormSubmit}>
          <div className="flex-column space-around user-box">
            <div  className="flex-start">
              <label>Username:</label>
              <input
                className="user-box-input"
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div  className="flex-start">
              <label>Password:</label>
              <input
                className="user-box-input"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <input className="button-log" type="submit" value="Login" />
          </div>
          <Link className="link" to='/Signup'>Sign Up</Link>
        </form>
        
      </div>
    );
  }
}

export default withAuth(Login);
