import React, { FunctionComponent } from "react";
import Home from "./components/views/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: FunctionComponent = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
