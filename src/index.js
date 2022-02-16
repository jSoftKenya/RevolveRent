import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";


import { HelmetProvider } from 'react-helmet-async';
import ReactGA from "react-ga";



import './assets/boxicons-2.0.7/css/boxicons.min.css'
// import './assets/css/grid.css'
// import './assets/css/theme.css'
// import './assets/css/index.css'

import { createBrowserHistory } from "history";
const trackingId = "UA-161722256-1";  //change
ReactGA.initialize(trackingId);

const history = createBrowserHistory();
// // Initialize google analytics page view tracking
// history.listen((location) => {
//   ReactGA.set({ page: location.pathname }); // Update the user's current page
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// });

ReactDOM.render(
  <HelmetProvider history={history}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </HelmetProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
