import React, { Component } from "react";
import { withAuth } from "../components/AuthProvider";
import userService from '../lib/user-service'
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

export default class EditProfile extends Component {
  state = {
    id: this.props.match.params.id,
    username: "",
    image: ""
  };

  componentDidMount(){
    this.showUser();
  }

  showUser = () => {
    userService.showUser(this.state.id)
    .then((user) => {
      this.setState( {
        user: user
      })
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // Pasamos aqui las dos varibles al back end por separada ya que sino el id pasa como objeto.
    userService.edit(this.state.id, this.state)
    .then((data) => {
      return data
    })
    .catch(error => console.log(error.response));
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <h1>Edit PROFILE</h1>
        <form>
          <div className="flex-create">
            <label for="inp" className="inp">
              <input
                id="inp"
                type="text"
                name="username"
                placeholder="&nbsp;"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <span className="label">Username</span>
              <span className="border" />
            </label>
          </div>
          <div className="flex-create">
            <label for="inp" className="inp">
              <input
                id="inp"
                type="text"
                name="image"
                placeholder="&nbsp;"
                value={this.state.image}
                onChange={this.handleChange}
              />
              <span className="label">Image</span>
              <span className="border" />
            </label>
          </div>
          <div className="create-btn">
            <button onClick={this.handleStage}>Save</button>
          </div>
        </form>
      </div>
    );
  }
}
