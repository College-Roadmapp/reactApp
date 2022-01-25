import React from 'react';
import logo from './logo.svg';
import './osu.css';
import beaverLogo from './beaverLogo.png'
import { render } from '@testing-library/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Header() {
  return (
  <header className="App-header">
      <a href="http://oregonstate.edu"><img src="http://oregonstate.edu/themes/osu/drupal8-osuhomepage/logo.svg" alt="Oregon State University"/></a>
      <div id="site-title">
      <a href=""><h1>College Roadmap App</h1></a>
      </div>
      {/* <button id="menu" className="dropdown-toggle" type="button" data-toggle="dropdown">
      <i className="fa fa-bars"></i>
      MENU
      </button> */}
      <div id="content-wrapper" className="Wrap">
        <nav id="navigation" role="menu">
          <ul className="dropdown-menu menu" role="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          </ul>
        </nav>
      </div>
  </header>
  )
}

function Home() {
  return (
    <body>
        <div id="page-hero" style={{backgroundImage: "url(" + "https://conferences.oregonstate.edu/sites/conferences.oregonstate.edu/files/beautiful-campus-oregon-state-university.jpg" + ")"}}>
          <form action="/" method="get">
            <input
                type="text"
                id="header-search"
                placeholder="Search"
                name="s" 
            />
            <button type="submit">Search</button>
        </form>
          <div className="container">
            <div className="Boxes">
              <div className="Description"> DESCRIPTION OF APP </div>
              <div className="Instructions"> INSTRUCTIONS FOR APP </div>
              </div>
          </div>
        </div>
          {/* <div>
              <a
                className="App-link"
                href="https://catalog.oregonstate.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Oregon State University's Academic Catalog
              </a>
          </div> */}
        </body>
  )
}

function About(){
  return(
    <body>
      <div>About</div>
    </body>
  )
}

function Resources(){
  return(
    <body>
      <div>Resources</div>
    </body>
  )
}

function App() {
  return (
    <div>
      
      <div>{Header()}</div>
      <Routes>
            <Route  path="/" element={<Home/>}/>
            <Route  path="/about" element={<About/>}/>
            <Route  path="/resources" element={<Resources/>}/>
        </Routes>
    </div>
  );
}

export default App;
