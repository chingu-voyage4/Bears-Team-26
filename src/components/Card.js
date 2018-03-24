import React, { Component } from "react";
import "../style/Card.css";
import share from "../images/share.png";
import { LikeButton, ShareButton } from "./Utils.js";
import { withRouter } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.stopHoverPropagation = this.stopHoverPropagation.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
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
    alert("TODO: Add Like events");
    event.stopPropagation();
  }

  stopHoverPropagation(e) {
    e.stopPropagation();
  }

  render() {
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
          </span>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Card);
