import React, { Component } from "react";
import styled from "styled-components";
import "../style/Flexbox.css";
import Card from "./Card.js";

const sampleIDs = [0, 1, 2, 3, 4];

const Flexbox = props => {
  return (
    <div id="flexbox">
      <Card
        id={sampleIDs[0]}
        imgUrl="https://static.boredpanda.com/blog/wp-content/uploads/2016/09/mother-bear-cubs-animal-parenting-21-57e3a2161d7f7__880.jpg"
      />
      <Card
        id={sampleIDs[1]}
        imgUrl="http://4.bp.blogspot.com/-ZQPQ9HhdEGw/U8gTj5Kt3nI/AAAAAAABBAE/9HGHGYhJRTY/s1600/cute-red-panda-04.jpg"
      />
      <Card
        id={sampleIDs[2]}
        imgUrl="https://tse1.mm.bing.net/th?id=OIP.NhV4BAbXK-KtznZSsbygMQHaE2&pid=Api"
      />
      <Card
        id={sampleIDs[3]}
        imgUrl="http://3.bp.blogspot.com/-DiuhxcjAZQM/TmOZWHcPJzI/AAAAAAAAAzU/DXHiYryXZ5M/s1600/red_panda_1.jpg"
      />
      <Card
        id={sampleIDs[4]}
        imgUrl="https://tse2.mm.bing.net/th?id=OIP.wyttLcrLj-6GpJkulGaqigHaKw&pid=Api"
      />
    </div>
  );
};

export default Flexbox;
