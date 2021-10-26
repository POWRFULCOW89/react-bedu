import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Reto1 from './components/Reto1-viejo';
import TodoList from './components/TodoList';
import Task from './components/Task';

import reportWebVitals from './reportWebVitals';
import 'bulma/css/bulma.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <TodoList />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={TodoList} />
        <Route exact path="/todo" component={Task} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
