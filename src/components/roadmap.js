import JsonDataDisplay from './jsonDataDisplay';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from './header';
import React from 'react';


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
          {<MajorDropDownMenu/>}
          {<OptionDropDownMenu/>}
      </div>
      </div>
  )
}

function CollegeDropDownMenu(){
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
          <MenuItem value={"ag-sci"}>Agricultural Sciences</MenuItem>
          <MenuItem value={"business"}>Business</MenuItem>
          <MenuItem value={"eart-ocean-atmos-science"}>Earth, Ocean, and Atmospheric Sciences</MenuItem>
          <MenuItem value={"education"}>Education</MenuItem>
          <MenuItem value={"engineering"}>Engineering</MenuItem>
          <MenuItem value={"forestry"}>Forestry</MenuItem>
          <MenuItem value={"liberal-arts"}>Liberal Arts</MenuItem>
          <MenuItem value={"pharmacy"}>Pharmacy</MenuItem>
          <MenuItem value={"public-health-human-science"}>Public Health and Human Sciences</MenuItem>
          <MenuItem value={"science"}>Science</MenuItem>
          <MenuItem value={"vet-science"}>Veterinary Medicine</MenuItem>
        </Select>
      </FormControl>
      {college === "engineering" ?
      <div>
      {<JsonDataDisplay/>}
      </div>
      :
      <div></div>
      }
    </div>
  );
}
  
function MajorDropDownMenu(){
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
          <MenuItem value={"arch"}>Architectual Engineering</MenuItem>
          <MenuItem value={"bio"}>Bioengineering</MenuItem>
          <MenuItem value={"chem"}>Chemical Engineering</MenuItem>
          <MenuItem value={"civil"}>Civil Engineering</MenuItem>
          <MenuItem value={"compsci"}>Computer Science</MenuItem>
          <MenuItem value={"construction-mgmt"}>Construction Engineering Management</MenuItem>
          <MenuItem value={"eco"}>Ecological Engineering</MenuItem>
          <MenuItem value={"electric"}>Electrical and Computer Engineering</MenuItem>
          <MenuItem value={"energy-sys"}>Energy Systems Engineering</MenuItem>
          <MenuItem value={"eng-sci"}>Engineering Science</MenuItem>
          <MenuItem value={"enviro"}>Environmental Engineering</MenuItem>
          <MenuItem value={"industrial"}>Industrial Engineering</MenuItem>
          <MenuItem value={"manufacturing"}>Manufacturing Engineering</MenuItem>
          <MenuItem value={"mechanical"}>Mechanical Engineering</MenuItem>
          <MenuItem value={"nuclear"}>Nuclear Engineering</MenuItem>
          <MenuItem value={"radiation"}>Radiation Health Physics</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
  
function OptionDropDownMenu(){
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
  
export default Roadmap;