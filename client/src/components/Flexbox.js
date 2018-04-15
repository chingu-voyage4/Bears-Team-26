import React, { Component } from "react";
import styled from "styled-components";
import "../style/Flexbox.css";
import Card from "./Card.js";

const createCard = props => {
  const { _id, imageURL, options } = props;
  return <Card key={_id} id={_id} imgUrl={imageURL} options={options} />;
};

class Flexbox extends Component {
  constructor(props) {
    super(props);
    this.getLatestPins = this.getLatestPins.bind(this);
    this.state = {
      pins: []
    };
  }

  componentWillMount() {
    this.getLatestPins();
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
      return this.setState({
        pins: [...json.result]
      });
    } catch (err) {
      alert("Could not retrieve latest pins!", err);
    }
  }
  
  render () {
    console.log(this.state.pins);
    return (this.state.pins)
    ? <div id="flexbox">{this.state.pins.map(card => createCard(card))}</div>
    : <div></div>;
  }
};

export default Flexbox;
