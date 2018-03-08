import React, { Component } from "react";
import styled from "styled-components";
import "./Flexbox.css";
import Card from "./Card.js";

const Flexbox = props => {
  return (
    <div id="flexbox">
      <Card imgUrl="https://static.boredpanda.com/blog/wp-content/uploads/2016/09/mother-bear-cubs-animal-parenting-21-57e3a2161d7f7__880.jpg" />
      <Card imgUrl="http://4.bp.blogspot.com/-ZQPQ9HhdEGw/U8gTj5Kt3nI/AAAAAAABBAE/9HGHGYhJRTY/s1600/cute-red-panda-04.jpg" />
     
      <Card imgUrl="http://3.bp.blogspot.com/-DiuhxcjAZQM/TmOZWHcPJzI/AAAAAAAAAzU/DXHiYryXZ5M/s1600/red_panda_1.jpg" />
     
    </div>
  );
};

export default Flexbox;
