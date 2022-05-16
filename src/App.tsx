import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";
import './App.css';
import RegisterContainer from './containers/RegisterContainer';
import CallbackContainer from './containers/CallbackContainer';

import ErrorContainer from './containers/ErrorContainer';
import ChatBott from './components/ChatBot/ChatBot';
import FAQContainer from './containers/FAQContainer';
import withClearCache from './hocs/withClearCache';


const ClearCacheComponent = withClearCache(MainApp);

function App() {
  return <ClearCacheComponent/>;
}

function MainApp() {
  return (
    <div className="App">
      <div className="App-Bg"></div>
      <div className="App-content">
        <Router>
          <Routes>
            <Route path="/" element={<RegisterContainer/>} />
            <Route path="/FAQ" element={<FAQContainer/>} />
            <Route path="/error" element={<ErrorContainer/>} />
            <Route path="/auth/callback" element={<CallbackContainer/>} />
            <Route path='/*' element={<Navigate to="/" />}/>
          </Routes>
        </Router>
        <ChatBott/>
      </div>
    </div>
  );
}

export default App;
