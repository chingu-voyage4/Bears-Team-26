import React, { Component } from "react";
import styled from "styled-components";
import "../style/Flexbox.css";
import Card from "./Card.js";
import Masonry from 'react-masonry-component';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  retrievedPinsAction,
  retrieveNewPinsAction
} from "../store/actionTypes";

const createCard = (props) => {
  const { _id, imageURL, options } = props;
  return <Card key={_id} id={_id} imgUrl={imageURL} options={options} />;
};

class Flexbox extends Component {
  constructor(props) {
    super(props);
    this.getLatestPins = this.getLatestPins.bind(this);
    this.getPinsByBoardID = this.getPinsByBoardID.bind(this);
    this.state = {
      pins: [],
    };
  }

  componentDidMount() {
    if (this.props.board === "latest") {
      this.getLatestPins();
    } else {
      this.getPinsByBoardID();
    }
  }

  async getLatestPins () {
    try {
      // I tried a GET request but it didn't work, and I'm not sure why.
      // Currently returns the newest 100 pins
      const response = await fetch('/boards/latestInfo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      });
      const json = await response.json();
      this.props.retrievedPinsAction();
      return this.setState({
        pins: [...json.result]
      });
    } catch (err) {
      alert("Could not retrieve latest pins!", err);
    }
  }

  async getPinsByBoardID () {
    const { match: { params } } = this.props;
    const res = await fetch(`/boards/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await res.json();
    if (json.err) {
      alert("Error retrieving this board\'s pins", json.err);
    }
    this.props.retrievedPinsAction();
    return this.setState({ pins: [...json.result.pins] });
  }
  
  render () {
    const { match: { params } } = this.props;
    if (params.id && !this.props.recentlyRetrievedPins) {
      this.getPinsByBoardID();
      return null;
    } else if (!params.id && !this.props.recentlyRetrievedPins) {
      this.getLatestPins();
      return null;
    } else {
      if (this.state.pins) {
        return (
        <Masonry className="flexbox" options={{ percentPosition: true }}>
          {[...this.state.pins.map(card => { 
              return createCard(card);
            })]}
        </Masonry>
        );
      } else {
        return null;
      }
    }
    
  }
};

const mapStateToProps = state => {
  return {
    recentlyRetrievedPins: state.recentlyRetrievedPins
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ retrievedPinsAction, retrieveNewPinsAction }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Flexbox);
