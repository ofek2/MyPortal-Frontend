import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import RegisterContainer from './containers/RegisterContainer';
import CallbackContainer from './containers/CallbackContainer';

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Router>
          <Switch>
            <Route exact path="/" component={RegisterContainer}/>
            <Route exact path="/auth/callback" component={CallbackContainer}/>
            <Redirect to="/"/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
