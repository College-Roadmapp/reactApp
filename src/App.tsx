import React,{ useState, useEffect } from 'react';
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
// import { ProgressBar } from 'primereact/progressbar';
// import 'bootstrap/dist/css/bootstrap.css';
// import {ProgressBar} from 'react-bootstrap'
import Progressbar from './component/progressBar';

function Header() {
  return (
  <header className="App-header">
      <a href="http://oregonstate.edu"><img src="http://oregonstate.edu/themes/osu/drupal8-osuhomepage/logo.svg" alt="Oregon State University"/></a>
      <div id="site-title">
      <a href=""><h1>myOSURoadmap</h1></a>
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
      <form action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Search"
            name="s"
          />
          <button type="submit">Search</button>
      </form>
        <div id="page-hero" style={{backgroundImage: "url(" + "https://conferences.oregonstate.edu/sites/conferences.oregonstate.edu/files/beautiful-campus-oregon-state-university.jpg" + ")"}}>
          <div className="container">
            <div className="Boxes">
              <div className="Description">
                <p>
                myOSURoadmap is a student-built application that is intended to assist first-year students, transfer students, and students in exploratory studies with gathering the information they need to satisfy their graduation requirements. This tool is designed so that any current or potential Oregon State student can easily comprehend the complex course map for their degree. Users are also provided access to additional information like their degree progress, tuition prices, and the ability to explore other degrees. 
                </p>
              </div>

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
      <Progressbar bgcolor="orange" progress='30'  height={30} />
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
