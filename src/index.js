import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Route, Link, BrowserRouter, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Link to="/">Home</Link> */}
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="*" element={<NotFound />}/>
        <Route />
      </Routes>
    </BrowserRouter>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
