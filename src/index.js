import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Router, Route, Link } from 'react-router-dom';
import history from './history';
import './index.css'

ReactDOM.render(
  <Router history={history}><App /></Router>,
  document.getElementById('root')
);
