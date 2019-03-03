import React, { Component } from "react";
import { withAuth } from '../components/AuthProvider'
import { Redirect } from "react-router-dom";
import userService from "../lib/user-service";
import BottomBar from "../components/BottomBar";

class EditProfile extends Component {
  state = {
    _id: this.props.match.params.id,
    username: "",
    image: "",
  };

  componentDidMount() {}

  handleFormSubmit = event => {
    console.log(this.props)
    event.preventDefault();
    const { _id, username, image } = this.state;
    
    const {email, password} = this.props.user;
    console.log(_id);
    // Pasamos aqui las dos varibles al back end por separada ya que sino el id pasa como objeto.
    userService
      .edit(_id, { _id, email, password, username, image })
      .then(data => {
        const { username, image } = data;
        this.setState({
          username,
          image
        });
      })
      .then(() => {
        console.log('pollas en vinagre')
        return <Redirect to={`/user/profile/${_id}`} />;
      })
      .catch(error => console.log(error.response));
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
            <button onClick={this.handleFormSubmit}>Save</button>
          </div>
        </form>
        <BottomBar />
      </div>
    );
  }
}

export default withAuth(EditProfile);