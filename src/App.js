import React from 'react';
import './osu.css';
import Header from './components/header';

function AppInfo(){
  return(
  <div>
    <div id="page-hero" style={{backgroundImage: "url(" + "https://conferences.oregonstate.edu/sites/conferences.oregonstate.edu/files/beautiful-campus-oregon-state-university.jpg" + ")"}}>
      <div className="container">
        <div className="description">
          <div className="homeText">
            myOSURoadmap is a student-built application that is intended to assist first-year students, transfer students, and students in exploratory studies with gathering the information they need to satisfy their graduation requirements.
            This tool is designed so that any current or potential Oregon State student can easily comprehend the complex course map for their degree. Users are also provided access to additional information like their degree progress, tuition prices, and the ability to explore other degrees.
          </div>
        </div>

        <div className="instructions">
          <div className="homeText">
            To simulate your college roadmap, follow the tab labeled “roadmap”. From there, you will be able to select your major’s college, followed by your degree. That degree’s required courses will be allocated across twelve tables to represent four years worth of academic terms. Select “change term” to move a course into a different table. Mark off completed courses using the checkboxes and view your overall progress using the progress bar. The tuition calculator will automatically produce an estimate for your tuition cost.
            
          </div>
        </div>
      </div>
    </div>
    <div className="homepageDisclaimer">
      <img className="disclaimerPic" src="https://cdn-icons-png.flaticon.com/512/0/101.png" alt="alternatetext"/>
      <div className="disclaimerText">
        <p className="bold"> Disclaimer </p>
        <p> myOSURoadmap was built by a group of OSU seniors for a year-long design project. Our team's motive is to help students envision their potential required courses and facilitate a place to customize an approximated degree map. For precise degree requirements and other specific questions, students should contact their academic advisor or their major’s college. </p>
      </div>
    </div>
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
