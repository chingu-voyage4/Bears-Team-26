import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import BigCard from "./components/BigCard";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
const mount = Enzyme.mount;

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = mount(<AppRouter />);
});

it("renders a BigCard successfully", () => {
  const div = mount(
    <BrowserRouter>
      <BigCard />
    </BrowserRouter>
  );

  const numberOfComments = div
    .find("#CommentsSpan")
    .first()
    .text()
    .substring(0, 1);

  expect(parseInt(numberOfComments, 10)).toBeGreaterThanOrEqual(0);
});
