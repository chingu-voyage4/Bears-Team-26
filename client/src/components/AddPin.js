import React from "react";
import createRef from "create-react-ref/lib/createRef";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import "../style/Utils.css";
import "../style/BigCard.css";
import "../style/AddPin.css";
import addImg from "../images/add.png";

const checkImgUrl = url => {
  const httpRegEx = /^http/i;
  const siteRegEx = /\.com|\.org|\.net|\.gov/i;
  const imgRegEx = /\.jpg|jpeg|\.bmp|\.gif|\.png/i;
  return httpRegEx.test(url) && siteRegEx.test(url) && imgRegEx.test(url);
};

class AddPin extends React.Component {
  constructor(props) {
    super(props);
    this.handleReturnToSplash = this.handleReturnToSplash.bind(this);
    this.handleCreatePin = this.handleCreatePin.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.imgUrlInput = createRef();
    this.focusUrlInput = this.focusUrlInput.bind(this);
    this.state = {
      title: "",
      imgURL: "",
      description: "",
      previewImg: addImg
    };
  }

  handleReturnToSplash(e) {
    e.stopPropagation();
    if (e.target.className === "outerTint") {
      return this.props.history.goBack();
    }
  }

  handleInputChange(e) {
    if (e.target.name === "title") {
      if (e.target.value.length <= 15) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    } else if (e.target.name === "imgURL") {
      if (checkImgUrl(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value,
          previewImg: e.target.value
        });
      } else {
        this.setState({
          [e.target.name]: e.target.value,
          previewImg: addImg
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  focusUrlInput() {
    this.imgUrlInput.current.focus();
  }

  async handleCreatePin() {
    const { title, imgURL, description, previewImg } = this.state;
    if (
      !title ||
      !imgURL ||
      !description ||
      (previewImg === addImg || !checkImgUrl(previewImg))
    ) {
      return alert("Please complete all forms before creating a new pin!");
    }
    if (!this.props.isAuthenticated) {
      return alert("You must be logged in to create pins!");
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
          description: description,
          postedOn: new Date().toDateString(),
          creator: this.props.user.displayName
        })
      });
      const json = await response.json();
      const { result } = json;
      const latestBoardResponse = await fetch("/boards/latest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newPin: result
        })
      });
      return this.props.history.push({
        pathname: `/pin/${result._id}`,
        state: { imgUrl: imgURL }
      });
    } catch (err) {
      console.log(err);
      return alert("There was an error creating new pin!");
    }
  }

  render() {
    return (
      <div className="outerTint" onClick={this.handleReturnToSplash}>
        <div className="bigCard">
          <div className="eightByEightGrid">
            <div
              onClick={this.focusUrlInput}
              style={{
                backgroundImage: `url(${this.state.previewImg})`,
                "background-size":
                  this.state.previewImg === addImg ? "auto" : null
              }}
              title="Please enter an Image URL"
              className="threeEighthsSpan threeEighthsTall previewImg"
            />
            <div className="fullTall" style={{ "grid-column-start": "8" }} />
            <label
              className="halfSpan"
              for="imgURL"
              style={{ "align-self": "end" }}
            >
              Image URL
            </label>
            <input
              name="imgURL"
              value={this.state.imgURL}
              onChange={this.handleInputChange}
              className="inputLine halfSpan"
              style={{ "align-self": "start" }}
              ref={this.imgUrlInput}
            />
            <div className="halfTall" />
            <label
              for="title"
              style={{ "align-self": "end" }}
              className="quarterSpan"
            >
              Title
            </label>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              className="inputLine quarterSpan"
              style={{ "align-self": "end" }}
            />
            <div className="quarterSpan" />
            <label for="description" className="quarterSpan">
              Description
            </label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
              className="quarterTall halfSpan inputBox"
            />
            <button className="createButton" onClick={this.handleCreatePin}>
              Create Pin!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps)(AddPin);
