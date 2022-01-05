import React from 'react';
import logo from './logo.svg';
import './osu.css';
import beaverLogo from './beaverLogo.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <a href="http://oregonstate.edu"><img src="http://oregonstate.edu/themes/osu/drupal8-osuhomepage/logo.svg" alt="Oregon State University"/></a>
      <div id="site-title">
      <a href=""><h1>College Roadmap App</h1></a>
      </div>
      <button id="menu" className="dropdown-toggle" type="button" data-toggle="dropdown">
      <i className="fa fa-bars"></i>
   
      MENU
      </button>
      <ul className="dropdown-menu menu" role="menu">
        <li><a href="">Home</a></li>
        <li><a href="">About Us</a></li>
        <li><a href="">Resources</a></li>
      </ul>
    </header>
      <div>
          <a
            className="App-link"
            href="https://catalog.oregonstate.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oregon State University's Academic Catalog
          </a>
      </div>
    </div>
  );
}

export default App;
