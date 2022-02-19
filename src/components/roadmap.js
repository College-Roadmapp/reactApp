import JsonDataDisplay from './jsonDataDisplay';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from './header';
import React, { Component, useState } from 'react';
// import { Menu } from '@mui/material';
// import { render } from '@testing-library/react';


function Roadmap() {
    return(
        <div>
            {Header()}
            {<AppDisplay/>}
        </div>
    )
}

function AppDisplay(){
  return(
      <div className="displayApp">
      <div className = "dropDownMenu">
          {<CollegeDropDownMenu/>}
          {/* {<MajorDropDownMenu/>} */}
          {/* {<OptionDropDownMenu/>} */}
      </div>
      </div>
  )
}

function CollegeDropDownMenu(){
  let colleges = [
    {label: "Agricultural Sciences", value: "ag-sci"},
    {label: "Business", value: "business"},
    {label: "Earth, Ocean, and Atmospheric Sciences", value: "earth-ocean-atmos-science"},
    {label: "Education", value: "education"},
    {label: "Engineering", value: "engineering"},
    {label: "Forestry", value: "forestry"},
    {label: "Liberal Arts", value: "liberal-arts"},
    {label: "Pharmacy", value: "pharmacy"},
    {label: "Public Health and Human Sciences", value: "public-health-human-science"},
    {label: "Science", value: "science"},
    {label: "Veterinary Medicine", value: "vet-med"},
  ]

  const [college, setCollege] = React.useState('');

  const handleChange = (event) => {
    setCollege(event.target.value);
  };
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
            {colleges.map((college) => <MenuItem value={college.value}>{college.label}</MenuItem>)}
          </Select>
        </FormControl>
        {college === "engineering" ?
        <div>
        {<JsonDataDisplay/>}
        </div>
        :
        <div></div>
        }
        {college !== '' ?
        <div>
          {<MajorDropDownMenu/>}
        </div>
        :
        <div></div>
        }
      </div>
  );
}
  

function MajorDropDownMenu(){

  let engineeringMajors = [
    {label: "Architectual Engineering", value: "arch"},
    {label: "Bioengineering", value: "bio"},
    {label: "Chemical Engineering", value: "chem"},
    {label: "Civil Engineering", value: "civil"},
    {label: "Computer Science", value: "comp-sci"},
    {label: "Construction Engineering Management", value: "construction-mgmt"},
    {label: "Ecological Engineering", value: "eco"},
    {label: "Electric and Computer Engineering", value: "electric"},
    {label: "Energy Systems Engineering", value: "energy-sys"},
    {label: "Environmental Engineering", value: "enviro"},
    {label: "Industrial Engineering", value: "industrial"},
    {label: "Manufacturing Engineering", value: "manufacturing"},
    {label: "Mechanical Engineering", value: "mechanical"},
    {label: "Nuclear Engineering", value: "nuclear"},
    {label: "Radiation Health Physics", value: "radiation"},
  ]
  const [major, setMajor] = React.useState('');

  const handleChange = (event) => {
    setMajor(event.target.value);
  };
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
          {engineeringMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
          
        </Select>
      </FormControl>
      {major === 'comp-sci' ?
        <div>
          {<OptionDropDownMenu/>}
        </div>
        :
        <div></div>
        }
    </div>
  );
}
  
function OptionDropDownMenu(){
  let csOptions =[
    {label: "Cybersecurity", value:"cyber-sec"},
    {label: "Data Science", value:"data"},
    {label: "Artificial Intelligence", value:"ai"},
    {label: "Robot Intelligence", value:"robot"},
    {label: "Bioinformatics", value:"bio"},
    {label: "Business and Entrepeneurship", value:"business"},
    {label: "Human-Computer Interaction", value:"human-comp"},
    {label: "Simulation and Game Programming", value:"game"},
    {label: "Web and Mobile Application", value:"web"},
    {label: "Systems", value:"sys"}
  ]
  const [option, setOption] = React.useState('');

  const handleChange = (event) => {
    setOption(event.target.value);
  };
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
          {csOptions.map((option) => <MenuItem value={option.value}>{option.label}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}
  
export default Roadmap;