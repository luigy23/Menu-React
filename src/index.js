import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './App/Store';
import axios from 'axios';
import Cookies from 'js-cookie';

import { BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
axios.interceptors.request.use(config => {
  //sacamos el token del localstorage:
  const token = Cookies.get('token')
 
  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
})

root.render(
  
  <React.StrictMode>
  <Provider store={store}>
  <Router>
    <App />
  </Router>


  </Provider>
 </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

