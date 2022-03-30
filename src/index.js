import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import User from './containers/User';
import Register from './containers/register';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import configureStore from './stores/index'
import Login from './containers/login';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/user/:id" element={<User />}/>
          <Route path="/aboutUs" element={<App />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<NotFound />}/>
          <Route />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
