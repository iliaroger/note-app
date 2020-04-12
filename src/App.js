import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/LoginPage';
import Read from './Components/ReadPage';
import Post from './Components/PostPage';

function App() {
  return (
    <div className="mainBackground">
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/read" component={Read}/>
            <Route exact path="/post" component={Post}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
