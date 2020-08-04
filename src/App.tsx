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
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Header/>
        <Router>
          <Switch>
            <Route exact path="/" component={RegisterContainer}/>
            <Route exact path="/auth/callback" component={CallbackContainer}/>
            <Redirect to="/"/>
          </Switch>
        </Router>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
