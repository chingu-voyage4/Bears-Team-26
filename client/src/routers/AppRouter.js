import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Header from "../components/Header";
import Flexbox from "../components/Flexbox";
import Footer from "../components/Footer";
import BigCard from "../components/BigCard";


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Flexbox} exact={true} />
        <Route path="/pin/:pinID" render={props => <BigCard {...props} />} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
