import React from 'react';
import './osu.css';
import Header from './component/header';


function Home() {
  return (
    <body>
      {<AppInfo/>}
    </body>
  )
}

function AppInfo(){
  return(
  <div id="page-hero" style={{backgroundImage: "url(" + "https://conferences.oregonstate.edu/sites/conferences.oregonstate.edu/files/beautiful-campus-oregon-state-university.jpg" + ")"}}>
    <div className="container">
      <div className="description">
        <p>
          myOSURoadmap is a student-built application that is intended to assist first-year students, transfer students, and students in exploratory studies with gathering the information they need to satisfy their graduation requirements.
          This tool is designed so that any current or potential Oregon State student can easily comprehend the complex course map for their degree. Users are also provided access to additional information like their degree progress, tuition prices, and the ability to explore other degrees.
        </p>
      </div>

      <div className="instructions"> instructions for app </div>
    </div>
  </div>
  )
}

function App() {
  return (
    <div>
      {Header()}
      {Home()}
    </div>
  );
}

export default App;