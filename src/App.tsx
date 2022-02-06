import React,{ useState, useEffect, Component, MouseEvent } from 'react';
import './osu.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Progressbar from './component/progressBar';
import Header from './component/header';
import About from './component/about';
import Class from './component/class';
import Resources from './component/resources';
import ComputerScience from './computerScience.json'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Home() {
  return (
    <body>
      {<AppInfo/>}
      {<CollegeDropDownMenu/>}
      {<MajorDropDownMenu/>}
      {<OptionDropDownMenu/>}
      {<AppDisplay/>}
      {<TermAddingClassesDropdown/>}
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

function AppDisplay(){
  return(
    <div className="displayApp">
      <div className="classTable">
        <JsonDataDisplay/>
      </div>
    </div>

  )

}

function JsonDataDisplay(){
    let DisplayData: Array<any>;
    DisplayData=ComputerScience.computerScience.map(
        (info, i)=>{
            return(
                <tr>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.credits}</td>
                    <td>{info.term}</td>
                </tr>
            )
        }
    );
    //DisplayData.sort((a, b) => (a.credits < b.credits) ? 1 : -1)

    //let NewArray: Array<any>;

    //var NewArray = [];

    //for (var j = 0; j < DisplayData.length; j++){\
    //  let var0 = DisplayData[0];
    //  let var1 = var0.credits;
    //  let var2 = "3";
    //  if (1 ){
    //    NewArray.push(DisplayData[0]);
    //  }

/*
    let sortedData = [...DisplayData];
    sortedData.sort((a,b) => {
      if(a.name < b.name){
        return -1;
      }
      if(a.name > b.name){
        return 1;
      }
    });

*/
    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Term</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    )
  }


//https://www.kindacode.com/article/react-typescript-handling-onclick-event/
//make button trigger drop down menu
//name each drop down item like button has name="button 1"
//then instead of printing {clickedButton} which gives us the name
//print the value of drop down item

//drop down will have all possible classes for that major

const TermAddingClassesButton: React.FunctionComponent = () => {
  const [clickedButton, setClickedButton] = useState('');

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };

  return (
    <div className='displayApp'>
      <div className="classTable">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fall 2022 Classes</th>
              <th>Credits</th>
            </tr>
            <tr>
              <button onClick={buttonHandler} className="button" name="button 1">
                Add Class
              </button>
            </tr>
          </thead>
          <tbody>
            <tr>
              <h1>
                {clickedButton !== ""
                  ? <div>CS290
                    <div>you have clicked {clickedButton}</div>
                  </div>
                  : ""}
              </h1>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
};


const TermAddingClassesDropdown: React.FunctionComponent = () => {
  const [classN, setClassN] = React.useState('');

  const handleChange = (event: any) => {
    event.preventDefault();

    // const MenuItem: HTMLButtonElement = event.currentTarget;
    setClassN(event.target.value);
  };

  return (
    <div className='displayApp'>
      <div className="classTable">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fall 2022 Classes</th>
              <th>Credits</th>
            </tr>
            <tr>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={classN}
                  label="Class"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={290}>CS290:WebDev</MenuItem>
                  <MenuItem value={344}>CS344:OS1</MenuItem>
                  <MenuItem value={444}>CS444:OS1</MenuItem>
                  <MenuItem value={370}>CS370:Intro to Security</MenuItem>
                  <MenuItem value={427}>CS427:Cryptography</MenuItem>
                </Select>
              </FormControl>
            </tr>
          </thead>
          <tbody>
            <tr>
              <h1>
                {classN !== ""
                  ? <div>CS{classN}</div>
                  : ""}
              </h1>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
};

function CollegeDropDownMenu(){
  const [college, setCollege] = React.useState('');

  const handleChange = (event : any) => {
    setCollege(event.target.value);
  };
//https://mui.com/components/selects/
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">College</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={college}
          label="College"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Agricultural Sciences</MenuItem>
          <MenuItem value={20}>Business</MenuItem>
          <MenuItem value={30}>Earth, Ocean, and Atmospheric Sciences</MenuItem>
          <MenuItem value={40}>Education</MenuItem>
          <MenuItem value={50}>Engineering</MenuItem>
          <MenuItem value={60}>Forestry</MenuItem>
          <MenuItem value={70}>Liberal Arts</MenuItem>
          <MenuItem value={80}>Pharmacy</MenuItem>
          <MenuItem value={90}>Public Health and Human Sciences</MenuItem>
          <MenuItem value={100}>Science</MenuItem>
          <MenuItem value={110}>Veterinary Medicine</MenuItem>
        </Select>
        {/* <FormHelperText>College</FormHelperText> */}
      </FormControl>
    </div>
  );
}

function MajorDropDownMenu(){
  const [major, setMajor] = React.useState('');

  const handleChange = (event : any) => {
    setMajor(event.target.value);
  };
//https://mui.com/components/selects/
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={major}
          label="Major"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Architectual Engineering</MenuItem>
          <MenuItem value={20}>Bioengineering</MenuItem>
          <MenuItem value={30}>Chemical Engineering</MenuItem>
          <MenuItem value={40}>Civil Engineering</MenuItem>
          <MenuItem value={50}>Computer Science</MenuItem>
          <MenuItem value={60}>Construction Engineering Management</MenuItem>
          <MenuItem value={70}>Ecological Engineering</MenuItem>
          <MenuItem value={80}>Electrical and Computer Engineering</MenuItem>
          <MenuItem value={90}>Energy Systems Engineering</MenuItem>
          <MenuItem value={100}>Engineering Science</MenuItem>
          <MenuItem value={110}>Environmental Engineering</MenuItem>
          <MenuItem value={120}>Industrial Engineering</MenuItem>
          <MenuItem value={130}>Manufacturing Engineering</MenuItem>
          <MenuItem value={140}>Mechanical Engineering</MenuItem>
          <MenuItem value={150}>Nuclear Engineering</MenuItem>
          <MenuItem value={160}>Radiation Health Physics</MenuItem>
        </Select>
        {/* <FormHelperText>Major</FormHelperText> */}
      </FormControl>
    </div>
  );
}

function OptionDropDownMenu(){
  const [option, setOption] = React.useState('');

  const handleChange = (event : any) => {
    setOption(event.target.value);
  };
  //https://mui.com/components/selects/
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Option</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={option}
          label="Option"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Applied Option: Cybersecurity</MenuItem>
          <MenuItem value={20}>Applied Option: Data Science</MenuItem>
          <MenuItem value={30}>Applied Option: Artificial Intelligence</MenuItem>
          <MenuItem value={40}>Applied Option: Robot Intelligence</MenuItem>
          <MenuItem value={50}>Applied Option: Bioinformatics</MenuItem>
          <MenuItem value={60}>Applied Option: Business and Entrepeneurship</MenuItem>
          <MenuItem value={70}>Applied Option: Human-Computer Interaction</MenuItem>
          <MenuItem value={80}>Applied Option: Simulation and Game Programming</MenuItem>
          <MenuItem value={90}>Applied Option: Web and Mobile Application</MenuItem>
          <MenuItem value={100}>Systems Option</MenuItem>
        </Select>
        {/* <FormHelperText>Option</FormHelperText> */}
      </FormControl>
    </div>
  );
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
