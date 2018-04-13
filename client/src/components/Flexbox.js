import React, { Component } from "react";
import styled from "styled-components";
import "../style/Flexbox.css";
import Card from "./Card.js";

const sampleCards = [
  {
    id: 0,
    imgUrl:
      "https://static.boredpanda.com/blog/wp-content/uploads/2016/09/mother-bear-cubs-animal-parenting-21-57e3a2161d7f7__880.jpg"
  },
  {
    id: 1,
    imgUrl:
      "http://4.bp.blogspot.com/-ZQPQ9HhdEGw/U8gTj5Kt3nI/AAAAAAABBAE/9HGHGYhJRTY/s1600/cute-red-panda-04.jpg"
  },
  {
    id: 2,
    imgUrl:
      "https://tse1.mm.bing.net/th?id=OIP.NhV4BAbXK-KtznZSsbygMQHaE2&pid=Api"
  },
  {
    id: 3,
    imgUrl:
      "http://3.bp.blogspot.com/-DiuhxcjAZQM/TmOZWHcPJzI/AAAAAAAAAzU/DXHiYryXZ5M/s1600/red_panda_1.jpg"
  },
  {
    id: 4,
    imgUrl:
      "https://tse2.mm.bing.net/th?id=OIP.wyttLcrLj-6GpJkulGaqigHaKw&pid=Api"
  }
];

const createCard = props => {
  const { id, imgUrl } = props;
  return <Card key={id} id={id} imgUrl={imgUrl} />;
};

class Flexbox extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return <div id="flexbox">{sampleCards.map(card => createCard(card))}</div>;
  }
};

export default Flexbox;
