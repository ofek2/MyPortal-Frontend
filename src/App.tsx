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
import ErrorContainer from './containers/ErrorContainer';
import ChatBott from './components/ChatBot/ChatBot';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <div className="App-content">
        <Router>
          <Switch>
            <Route exact path="/" component={RegisterContainer} />
            <Route exact path="/error" component={ErrorContainer} />
            <Route exact path="/auth/callback" component={CallbackContainer} />
            <Redirect to="/" />
          </Switch>
        </Router>
        {/* <Footer /> */}
        <ChatBott/>
      </div>
    </div>
  );
}

export default App;
