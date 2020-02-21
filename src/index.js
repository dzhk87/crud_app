import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';

import rootReducer from './reducers/index'

const store = createStore(rootReducer);

ReactDOM.render(

    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);
