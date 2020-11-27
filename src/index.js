import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FileManager from "./FileManager";
import {Provider} from "react-redux";
import {store} from "./store/reducers";
import {BrowserRouter as Router} from "react-router-dom"


ReactDOM.render(
  <React.StrictMode>
      <Router>
      <Provider store={store}>
          <FileManager/>
      </Provider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
