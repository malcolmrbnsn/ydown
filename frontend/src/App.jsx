import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import Navbar from "./components/Navbar"
import Main from "./containers/Main"

function App() {
  return (
    <Router>
      <Navbar />
      <Main />
    </Router>
  )
}

export default App;
