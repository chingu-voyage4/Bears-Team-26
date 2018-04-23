import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
//import App from './App';
import AppRouter from "./routers/AppRouter";
import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  //console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("app")
);
/*
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
