import React, { Component } from "react";
import { withAuth } from "../components/AuthProvider";
import { Redirect } from "react-router-dom";
import userService from "../lib/user-service";
import BottomBar from "../components/BottomBar";

class EditProfile extends Component {
  state = {
    _id: this.props.match.params.id,
    username: "",
    image: "",
    redirect: false
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { _id, username, image } = this.state;
    const { email, password } = this.props.user;
    userService
      .edit(_id, { _id, email, password, username, image })
      .then(data => {
        console.log(this.props);
        const { username, image } = data;
        this.props.setUser(data);
        this.setState({
          username,
          image,
          redirect: true
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/user/profile/`} />;
    } else {
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
              <button onClick={this.handleFormSubmit}>Save</button>
            </div>
          </form>
          <BottomBar />
        </div>
      );
    }
  }
}

export default withAuth(EditProfile);
