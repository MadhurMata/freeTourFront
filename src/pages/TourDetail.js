import React, { Component } from "react";
import tourService from "../lib/tour-service";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { Redirect } from "react-router";
import { withAuth } from "../components/AuthProvider";

class TourDetail extends Component {
  state = {
    id: this.props.match.params.id,
    tour: {},
    redirect: false,
    comments: [],
    commentInput: ""
  };

  componentDidMount() {
    this.showTour();
  }
  showTour = () => {
    tourService.showTour(this.state.id).then(tour => {
      this.setState({
        tour: tour
      });
    });
  };

  handleDelete = e => {
    e.preventDefault();
    tourService
      .delete(this.state.id)
      .then(data => {
        this.setState({ redirect: true });
        console.log("deletennnnn", this.state.redirect);
        return data;
      })
      .catch(error => console.log(error.response));
  };

  handleChange = event => {
    let { value } = event.target;
    console.log(value);
    this.setState({
      comment: value
    });
  };

  pushComment = e => {
    e.preventDefault();
    this.setState({
      comments: [...this.state.comments, this.state.comment]

    });
    
    console.log("this are", this.state.comments);
  };

  // handleFormSubmit = event => {
  //       event.preventDefault();
  //       tourService.comment(this.state.comments)
  //       .then(()=>{
  //         this.pushComment()
  //       })
  //       .then((data) => {
  //         return data
  //       })
  //       .catch(error => console.log(error.response));
  //     };
  
  isOwner = () => {
    const { tour } = this.state;
    if (tour.creator === this.props.user._id) {
      return (
        <div>
          <form onSubmit={this.handleDelete}>
            <button type="submit">Delete Tour</button>
          </form>
        </div>
      );
    }
  };

  render() {
    const { redirect } = this.state;
    const { tour } = this.state;
    const { comments } = this.state
    if (redirect) {
      return <Redirect to="/user/profile" />;
    } else {
      return (
        <div>
          <div className="tourDetailCard">
            <h1>{tour.name}</h1>
            <p>{tour.description}</p>
            <div className="detailCardImg">
              <img src={tour.image} alt="" />
            </div>
          </div>
          {this.isOwner()}
          <div className="comments">
            <form onSubmit={this.pushComment}>
              <input
                type="text"
                name="comments"
                onChange={this.handleChange}
                placeholder="Write a comment here..."
              />
              <button type="submit">Comment</button>
            </form>
          </div>
          <h1>Comments</h1>
          <div className="commentSection">
            {comments.map((comment, id) => {
              console.log(comments);
              return (
                <div className="commentBox" key = {id}>
                  {comment}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default withAuth(TourDetail);
