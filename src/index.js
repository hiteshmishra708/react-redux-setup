import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store/store';
// import './assets/css/bootstrap.css';
import './assets/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.min.css";

import { BrowserRouter } from 'react-router-dom';

const app = (
    <BrowserRouter >
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                < App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();