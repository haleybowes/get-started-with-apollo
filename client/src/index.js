import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import Product from './components/Product';

import "bootstrap/dist/css/bootstrap.min.css";

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      {/* <Route path="/hey" component={Profile} /> */}
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
