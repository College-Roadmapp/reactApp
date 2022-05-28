import React from 'react';
import './osu.css';
import Header from './components/header';
import warningPic from './components/images/warning.png'
import { Link } from "react-router-dom";

//renders home page of website
function AppInfo(){
  return(
  <div>
    <div id="page-hero" style={{backgroundImage: "url(" + "https://conferences.oregonstate.edu/sites/conferences.oregonstate.edu/files/beautiful-campus-oregon-state-university.jpg" + ")"}}>
      <div className="container">
        <div className="description">
          <div className="homeText">
            <h3> What is this app?</h3>
            MyOSURoadmap is a student-built application that is intended to assist first-year students, transfer students, and students in exploratory studies with gathering the information they need to satisfy their graduation requirements.
            This tool is designed so that any current or potential Oregon State student can easily comprehend the complex course map for their degree. Users are also provided access to additional information like their degree progress, tuition prices, OSU resources, and the ability to explore other degrees.
          </div>
        </div>

        <div className="instructions">
          <div className="homeText">
            <h3> How does it work?</h3>
            To simulate your college roadmap, follow the tab labeled “roadmap”. From there, you will be able to select your major’s college, followed by your degree. That degree’s required courses will be allocated across twelve tables to represent four years worth of academic terms. These are strictly example plans and do not include the ability to apply different options for that major. Select “change term” to move a course into a different table. An additional table, called the "course holder", can be used to temporarily store courses and hold any classes that overlap a requirement. Mark off completed courses using the checkboxes and see your overall progress displayed in the progress bar at the bottom of the screen. The tuition calculator will automatically produce an estimate for your tuition costs after entering a set amount of credits. You may save your customized degree map for future reference using the "print/save" button.

          </div>
        </div>
      </div>
    </div>
    <div className="homepageDisclaimer">
      <img src={warningPic} className="disclaimerPic"/>
      <div className="disclaimerText">
        <p className="bold"> Disclaimer </p>
        <p> Are you trying to navigate your exact roadmap that is specific to your degree? MyOSURoadmap was built by a group of OSU seniors for a year-long design project that generates generic degree maps for all undergraduate majors. For precise degree requirements and other specific questions, students should contact their academic advisor.
        Follow your college’s website <Link className="clickLink" to="/resources">here</Link> to locate your advising resources. </p>
      </div>
    </div>
    <div className="pageRemainder"> </div>
  </div>
  )
}

function App() {
  return (
    <div>
      {Header()}
      {<AppInfo/>}
    </div>
  );
}

export default App;
