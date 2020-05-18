import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Jokes from "./components/Jokes";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path = "/" component = {Register}/>
          <Route exact path = "/login" component = {Login}/>
          <PrivateRoute  exact path = "/users" component = {UJokes}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
