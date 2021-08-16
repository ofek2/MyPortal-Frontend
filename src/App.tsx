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

import ErrorContainer from './containers/ErrorContainer';
import ChatBott from './components/ChatBot/ChatBot';
import FAQContainer from './containers/FAQContainer';

function App() {
  return (
    <div className="App">
      <div className="App-Bg"></div>
      <div className="App-content">
        <Router>
          <Switch>
            <Route exact path="/" component={RegisterContainer} />
            <Route exact path="/FAQ" component={FAQContainer} />
            <Route exact path="/error" component={ErrorContainer} />
            <Route exact path="/auth/callback" component={CallbackContainer} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <ChatBott/>
      </div>
    </div>
  );
}

export default App;
