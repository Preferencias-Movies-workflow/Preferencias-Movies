import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { Button } from '@material-ui/core';

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Button } from '@material-ui/core';

// function App() {
//   return (
//     <div className="App">
//      <Button variant="contained" color="secondary">Sign up</Button>
//     </div>
//   );
// }

// export default App;
