import React,{ useState, useEffect, Component, MouseEvent } from 'react';
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
        <a href=""><h1>myOSURoadmap</h1></a>
        </div>
        <div id="content-wrapper" className="Wrap">
          <nav id="navigation" role="menu">
            <ul className="dropdown-menu menu" role="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/roadmap">Roadmap</Link>
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

export default Header;