import React, { Component } from "react";
import { withAuth } from "../components/AuthProvider";
import {Link} from 'react-router-dom';


class Login extends Component {
  state = {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
  };


  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // const isValid = this.validate();
    // if(isValid){
      
      this.props
        .login({ username, password })
        .then(() => {
          this.props.history.push("/");
        })
        .catch(error => console.log(error));
    // };
    }

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
                required
              />
            </div>
              {/* <div style={{color: "red"}}>{this.state.usernameError}</div> */}
            <div  className="flex-start">
              <label>Password:</label>
              <input
                className="user-box-input"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
              />
            </div>
            {/* <div style={{color: "red"}}>{this.state.passwordError}</div> */}
            <input className="button-log" type="submit" value="Login" />
          </div>
          <div className="sing-up">
          <h3>No account yet??</h3>
          <Link className="link" to='/Signup'>Sign Up</Link>
          </div>
        </form>
        
      </div>
    );
  }
}

export default withAuth(Login);
