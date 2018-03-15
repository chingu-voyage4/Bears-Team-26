import styled from "styled-components";

const LikeButton = styled.button`
  border: 1px hidden;
  border-radius: 25%;
  float: right;
  margin: 5px 5px 0 0;
  background: red;
  color: white;
  font-family: "Alegreya", serif;
  font-weight: bold;
  width: 40px;
  height: 21px;
`;

const ShareButton = styled.button`
  border: 1px hidden;
  border-radius: 25%;
  float: left;
  margin: 5px 0 0 5px;
  color: white;
  background: white;
  width: 40px;
  height: 21px;
`;

const BigLikeButton = styled.button`
  border: 1px solid darkred;
  box-shadow: 0px 0px 2px darkred;
  border-radius: 15%;
  float: right;
  margin: 10px 20px 0 0;
  background: red;
  color: white;
  font-family: "Alegreya", serif;
  font-weight: bold;
  width: 70px;
  height: 35px;
  font-size: 1.2em;
  text-shadow: 1px 2px darkred;
`;

const BigShareButton = styled.button`
  border: 1px solid hidden;
  box-shadow: 0px 0px 4px gray;
  border-radius: 15%;
  float: left;
  margin: 10px 0 0 20px;
  color: white;
  background: white;
  width: 70px;
  height: 35px;
`;

module.exports = {
  LikeButton,
  ShareButton,
  BigLikeButton,
  BigShareButton
};
