import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Navbar from "./components/common/Navbar"
import Home from "./components/Home/Home"
import Library from "./components/Library"

function App() {
  return (
    <Router>
      <div>
      {/* Navbar, always visible reguardless of url */}
      <Navbar />


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
