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
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleInputChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
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
      const response = await fetch("/pin/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          imageURL: imgURL,
          description: description
        })
      });
      const json = await response.json();
      const { result } = json;
      return this.props.history.push({pathname: `/pin/${result}`, state: {imgUrl:imgURL}});
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
            onChange={this.handleInputChange}
          />
          <label for="title">Title</label>
          <br />
          <input
            name="imgURL"
            value={this.state.imgURL}
            onChange={this.handleInputChange}
          />
          <label for="imgURL">Image URL</label>
          <br />
          <input
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
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
