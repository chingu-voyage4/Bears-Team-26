import React, { Component } from "react";
import "./Card.css";
import share from "./share.png";
import { LikeButton, ShareButton } from "./Utils.js";
import { withRouter } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.state = {
      isHovering: false
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  handleClick() {
    return this.props.history.push(`/pin/${this.props.id}`);
  }

  handleShare(event) {
    alert("TODO: Add Share events");
    event.stopPropagation();
  }

  handleLike(event) {
    alert("TODO: Add Like events");
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className={this.state.isHovering ? "card tinted" : "card"}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
        onClick={this.handleClick}
        style={{ backgroundImage: `url(${this.props.imgUrl})` }}
      >
        {this.state.isHovering ? (
          <span>
            <ShareButton onClick={this.handleShare}>
              <img src={share} height="100%" alt="Share!" />
            </ShareButton>
            <LikeButton onClick={this.handleLike}>Like!</LikeButton>
          </span>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Card);
