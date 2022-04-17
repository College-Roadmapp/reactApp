import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './components/about';
import Resources from './components/resources';
import Roadmap from './components/roadmap'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/roadmap" element={<Roadmap/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/" element={<App/>}/>
    </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
