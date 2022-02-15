import React,{ FC, useState, useEffect, Component, MouseEvent } from 'react';
import './osu.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './component/header';
import About from './component/about';
import ProgressBar from './component/progressBar';
import Resources from './component/resources';
import ComputerScience from './component/computerScience.json';
import JsonDataDisplay from './component/jsonDataDisplay';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AnyAaaaRecord } from 'dns';
// import { styled } from '@mui/material/styles';


function Home() {
  return (
    <body>
      {<AppInfo/>}
    </body>
  )
}

function Roadmap() {
  let terms=['Fall 2022', 'Winter 2022', 'Spring 2023', 
            'Fall 2023', 'Winter 2023', 'Spring 2024', 
            'Fall 2024', 'Winter 2024', 'Spring 2025', 
            'Fall 2025', 'Winter 2025', 'Spring 2026', 
            'Fall 2026', 'Winter 2026', 'Spring 2027'];
  return(
      <div>
          {/* <div className = "dropDownMenu">
              {<CollegeDropDownMenu/>}
              {<MajorDropDownMenu/>}
              {<OptionDropDownMenu/>}
          </div> */}
          {<AppDisplay/>}
           {/* {terms.map((item, index)=>{
            return (<div><h2>{item}</h2><Term key = {item}/></div>)
          })} */}
          {/* <ProgressBar bgcolor="orange" progress='30'  height={30} /> */}
      </div>
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
      <div className = "dropDownMenu">
        {<CollegeDropDownMenu/>}
        {<MajorDropDownMenu/>}
        {<OptionDropDownMenu/>}
      </div>
      {<JsonDataDisplay/>}
    </div>


  )
}


// function Term(key : any) {
  // return (
interface KeyProps {
  key: string,
}
const Term: FC<KeyProps> = (props):JSX.Element => {
  return(
    <div className='displayApp'>
      <div className="classTable">
        <table className="table table-striped">
          <thead>
            <tr>
              {/* {props.key} */}
              {/* <th>Fall 2022 Classes</th> */}
              <th>Classes</th>
              <th></th>
              <th></th>
              <th></th>
              <th>Credits</th>
            </tr>
            <tr>
            </tr>
          </thead>
          <tbody>
            {/* map JSON data instead of hardcode */}
            <tr>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="CS160" />
                </FormGroup>
            </tr>
            <tr>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="MTH251" />
                </FormGroup>
            </tr>
            <tr>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="WR121" />
                </FormGroup>
            </tr>
            <tr>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="HHS231" />
                </FormGroup>
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
            <Route  path="/roadmap" element={<Roadmap/>}/>
            <Route  path="/about" element={<About/>}/>
            <Route  path="/resources" element={<Resources/>}/>
      </Routes>
    </div>
  );
}

export default App;
