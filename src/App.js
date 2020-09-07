import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Conversation from "./Conversation.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </header>
        <Switch>
          <Route exact path="/">
            <span>Home </span>
          </Route>
          <Route path="/about">
            <Conversation />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
