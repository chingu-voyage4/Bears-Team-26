import React from "react";
import ReactDOM from "react-dom";
import Flexbox from "./components/Flexbox";
import BigCard from "./components/BigCard";
import "./App.css";

const App = () => {
  return (
    <div>
      <p>Pinterest!</p>
      <Flexbox />
      <BigCard
        imgUrl="https://static.boredpanda.com/blog/wp-content/uploads/2016/09/mother-bear-cubs-animal-parenting-21-57e3a2161d7f7__880.jpg"
        comments={commentsArr}
        postedBy="John Smith"
        postedOn={sampleDate}
      />
    </div>
  );
};

export default App;
