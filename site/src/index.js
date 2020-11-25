import React from 'react';
import ReactDOM from 'react-dom';
import {storeConfig, persistor} from './store/storeConfig'
import {PersistGate} from 'redux-persist/integration/react'
import App2 from './App2'
import * as serviceWorker from './serviceWorker'

import './index.css'
import './css/magnific-popup.css'
import './css/nice-select.css'
import {Provider} from 'react-redux'

const store = storeConfig

const Redux = () => (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App2 />
      </PersistGate>
  </Provider>
)


ReactDOM.render(
  <React.StrictMode>
    <Redux />
  </React.StrictMode>,
  document.getElementById('root')
);

//<PersistGate loading={null} persistor={persistor}>


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
