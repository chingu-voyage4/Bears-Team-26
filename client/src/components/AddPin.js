import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setPinDataAction } from "../store/actionTypes";
import styled from "styled-components";
import "../style/Utils.css";
import "../style/BigCard.css";

class AddPin extends React.Component {
  constructor(props) {
    super(props);
    this.handleReturnToSplash = this.handleReturnToSplash.bind(this);
    this.handleCreatePin = this.handleCreatePin.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleImgURLChange = this.handleImgURLChange.bind(this);
    this.state = {
      title: "",
      imgURL: "",
      description: ""
    };
  }

  handleReturnToSplash(e) {
    e.stopPropagation();
    if (e.target.className === "outerTint") {
      return this.props.history.goBack();
    }
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleImgURLChange(e) {
    this.setState({
      imgURL: e.target.value
    });
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  async handleCreatePin() {
    const { title, imgURL, description } = this.state;
    if (!title || !imgURL || !description) {
      return alert("Please complete all forms before creating a new pin!");
    }
    try {
      fetch("/pin/new", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          imageURL: imgURL,
          description: description
        })
      }).then(res => console.log(res), err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="outerTint" onClick={this.handleReturnToSplash}>
        <div className="bigCard">
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <label for="title">Title</label>
          <br />
          <input
            name="imgURL"
            value={this.state.imgURL}
            onChange={this.handleImgURLChange}
          />
          <label for="imgURL">Image URL</label>
          <br />
          <input
            name="description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <label for="description">Description</label>
          <br />
          <button onClick={this.handleCreatePin}>Create Pin!</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { ...bindActionCreators({ createPinAction }, dispatch) };
};

export default AddPin;
