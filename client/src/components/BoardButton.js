import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  retrievedPinsAction,
  retrieveNewPinsAction
} from "../store/actionTypes";

class BoardButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        key={this.props.id}
        data-identity={this.props.id}
        onClick={e => {
          fetch(`/boards/${e.target.dataset.identity}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              pin: this.props.pin
            })
          })
            .then(res => res.json())
            .then(json => {
              this.props.retrieveNewPinsAction();
              return this.props.history.push(`/board/${this.props.id}`);
            })
            .catch(err => {
              alert("Error adding pin to board", err);
            });
        }}
      >
        {this.props.title}
      </button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ retrieveNewPinsAction }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(withRouter(BoardButton));