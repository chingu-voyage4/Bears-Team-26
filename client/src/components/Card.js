import React, { Component } from "react";
import "../style/Card.css";
import share from "../images/share.png";
import { LikeButton, ShareButton } from "./Utils.js";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

const ReportButton = styled.button`
  position: absolute;
  top: 97.5%;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: rgb(200, 0, 40);
  color: white;
  left: 90%;
  border: 1px hidden;
  z-index: 10;
  font-size: 1.1em;
  padding-right: 7px;

  @media (min-width: 480px) {
    left: 87%;
    top: 97.5%;
    padding-right: 6px;
  }
`;

const TextLink = styled.button`
  position: absolute;
  top: 97.5%;
  left: 2%;
  border: 1px hidden;
  background: transparent;
  color: white;
  z-index: 10;
  font-family: "Alegreya", serif;

  &:active,
  &:focus {
    outline: none;
  }
`;

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.stopHoverPropagation = this.stopHoverPropagation.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleVisit = this.handleVisit.bind(this);
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  handleMouseExit() {
    this.setState({ isHovering: false });
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  handleClick() {
    return this.props.history.push({
      pathname: `/pin/${this.props.id}`,
      state: { imgUrl: this.props.imgUrl }
    });
  }

  handleShare(event) {
    alert("TODO: Add Share events");
    event.stopPropagation();
  }

  handleLike(event) {
    if (this.props.isAuthenticated) {
      alert("TODO: Add Like events");
    } else {
      alert("You must be logged in to like this Pin!");
    }
    event.stopPropagation();
  }

  handleReport(e) {
    e.stopPropagation();
    alert("TODO: Add Report events");
  }

  stopHoverPropagation(e) {
    e.stopPropagation();
  }

  handleVisit(e) {
    e.stopPropagation();
    window.open(this.props.imgUrl, "_blank");
  }

  render() {
    let urlLength =
      window.innerWidth >= 480 ? 25 : window.innerWidth >= 450 ? 45 : 34;
    return (
      <div
        className={this.state.isHovering ? "card tinted" : "card"}
        onMouseOver={this.handleMouseHover}
        onMouseLeave={this.handleMouseExit}
        onClick={this.handleClick}
        style={{ backgroundImage: `url(${this.props.imgUrl})` }}
      >
        {this.state.isHovering ? (
          <span>
            <ShareButton
              onClick={this.handleShare}
              onMouseOver={this.stopHoverPropagation}
              onMouseLeave={this.handleMouseHover}
            >
              <img src={share} height="100%" alt="Share!" />
            </ShareButton>
            <LikeButton
              onClick={this.handleLike}
              onMouseOver={this.stopHoverPropagation}
              onMouseLeave={this.handleMouseHover}
            >
              Like!
            </LikeButton>
            <TextLink
              onClick={this.handleVisit}
              onMouseOver={this.stopHoverPropagation}
              onMouseLeave={this.handleMouseHover}
            >
              {this.props.imgUrl.substring(0, urlLength)}
            </TextLink>
            <ReportButton
              onClick={this.handleReport}
              onMouseOver={this.stopHoverPropagation}
              onMouseLeave={this.handleMouseHover}
            >
              !
            </ReportButton>
          </span>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps)(withRouter(Card));
