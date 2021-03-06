import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Header from "../components/Header";
import Flexbox from "../components/Flexbox";
import Footer from "../components/Footer";
import BigCard from "../components/BigCard";
import AddPin from "../components/AddPin";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} render={props => <Flexbox board={"latest"} {...props} />} />
        <Route path="/pin/:pinID" render={props => <BigCard {...props} />} />
        <Route path="/newPin" component={AddPin} exact={true} />
        <Route path="/board/:id" render={props => <Flexbox {...props} />} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;
