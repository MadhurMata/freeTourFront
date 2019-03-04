import React, { Component } from "react";
import { withAuth } from "../components/AuthProvider";
import { Redirect } from "react-router-dom";
import userService from "../lib/user-service";
import BottomBar from "../components/BottomBar";
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


class EditProfile extends Component {
  state = {
    _id: this.props.match.params.id,
    username: "",
    // image: "",
    redirect: false,
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: this.props.user.image,
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { _id, username, avatarURL, image } = this.state;
    const { email, password } = this.props.user;
    const user = {
      _id,
      username,
      image: avatarURL,
      password
    }
    console.log(avatarURL)
    userService
    .edit(_id, user)
    .then(data => {
        const { username, image } = data;
        this.props.setUser(data);
        this.setState({
          username,
          redirect: true
        });
      })
      .catch(error => console.log(error));
  };

  handleUploadStart = () => this.setState({
    isUploading: true,
    progress: 0
});

handleProgress = (progress) => this.setState({
    progress
});

handleUploadError = (error) => {
    this.setState({
        isUploading: false
    });
    console.error(error);
}

handleUploadSuccess = (filename) => {
    this.setState({
        avatar: filename,
        progress: 100,
        isUploading: false
    });
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({
        avatarURL: url
    }));
};

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { avatarURL, username, location, progress, isUploading } = this.state;
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
            
              <CustomUploadButton
                accept="image/*"
                storageRef={firebase.storage().ref('images')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress} style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
                >
                Select your awesome avatar
              </CustomUploadButton>
                {isUploading && <p> Progress: {progress} </p>}
              {/* <div className="flex-create">
                  <label for="inp" className="inp">
                  <input type="text" value={username} name="username" onChange={this.handleChange}/>
                  <label> location: </label>
                  <input type="text" value={location} name="location" onChange={this.handleChange}/>
                  <span className="label">Image</span>
                  <span className="border" />
              </label>
            </div> */}
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
