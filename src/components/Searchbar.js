import React, { Component } from "react";

export default class Search extends Component {
  state = {
    searchWord: ""
  };

  handlerSearch = e => {
    const { search } = this.props;
    search(e.target.value);
    this.setState({
      searchWord: e.target.value
    });
  };

  render() {
    const { searchWord } = this.state;

    return (
      <div className="container">
        <input
          className="input is-info"
          type="text"
          value={searchWord}
          onChange={this.handlerSearch}
        />
      </div>
    );
  }
}
