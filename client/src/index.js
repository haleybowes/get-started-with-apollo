import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import Check from "./components/Check";

import "bootstrap/dist/css/bootstrap.min.css";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/check-check" component={Check} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
