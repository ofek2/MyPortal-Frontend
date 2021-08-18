import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme, StylesProvider, jssPreset } from '@material-ui/core';
import { create } from 'jss';
import './assets/fonts/NarkisBlock-Condensed_MFW_medium.ttf';
import './assets/fonts/Arimo-Bold.ttf';
import './assets/fonts/Arimo-Regular.ttf';
import rtl from 'jss-rtl';

// jss rtl workaround
const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);

// Creating app theme
const theme = createMuiTheme({
  direction: 'rtl',
  typography: {
    body1: {
      lineHeight: 1.3
    },
    fontFamily: 'NarkisBlock',
    fontSize: 18
  },
  palette: {
    primary: {
      main: "#fde85e",
    },
    text: {
      primary: "#333"
    }
  },
});


// Creating jss
const jss = create({
   plugins: [...jssPreset().plugins, rtl()],
   insertionPoint: "jss-insertion-point"
});

// Render the root component
ReactDOM.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <App />
      </StylesProvider>
    </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
