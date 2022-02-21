import JsonDataDisplay from './jsonDataDisplay';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from './header';
import React, { Component, useState } from 'react';


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
          {<DropDowns/>}
      </div>
      </div>
  )
}



//notes:
//couldnt render only the map MenuItem components because the conditional
//statements need a parent component
function DropDowns(){
  //---------- variables for college selection -----------
  const collegesJSON = require('./colleges.json');
  var parsedColleges = collegesJSON.colleges;
  const [college, setCollege] = React.useState('');
  const handleCollegeChange = (event) => {
    setCollege(event.target.value);
  };
  //---------- variables for major selection -----------
  const majorsJSON = require('./majors.json');
  var parsedMajors = majorsJSON.majors;
  var parsedAgSciMajors = parsedMajors.agSciMajors;
  var parsedBusMajors = parsedMajors.businessMajors;
  var parsedEOASMajors = parsedMajors.EOASMajors;
  var parsedEdMajors = parsedMajors.educationMajors;
  var parsedEngMajors = parsedMajors.engineeringMajors;
  var parsedForestryMajors = parsedMajors.forestryMajors;
  var parsedLibArtsMajors = parsedMajors.libArtsMajors;
  var parsedPharmMajors = parsedMajors.pharmacyMajors;
  var parsedPubHealthMajors = parsedMajors.pubHealthMajors;
  var parsedSciMajors = parsedMajors.scienceMajors;
  const [major, setMajor] = React.useState('');
  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };
  //---------- variables for option selection -----------
  const optionsJSON = require('./options.json');
  var parsedCSOption = optionsJSON.compScienceOptions;
  const [option, setOption] = React.useState('');
  const handleOptionChange = (event) => {
    setOption(event.target.value);
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
            onChange={handleCollegeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {parsedColleges.map((college) => <MenuItem value={college.value}>{college.label}</MenuItem>)}
          </Select>
        </FormControl>
        {college !== '' ?
        <div>
          <div>
            {college === "ag-sci" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedAgSciMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "business" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedBusMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "earth-ocean-atmos-science" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedEOASMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "education" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedEdMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "engineering" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedEngMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "forestry" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedForestryMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "liberal-arts" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedLibArtsMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "pharmacy" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedPharmMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "public-health-human-science" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedPubHealthMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            }
            {college === "science" &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Major</InputLabel>
                  <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={major}
                  label="Major"
                  onChange={handleMajorChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {parsedSciMajors.map((major) => <MenuItem value={major.value}>{major.label}</MenuItem>)}
                    </Select> 
              </FormControl>
            } 




            {major === 'comp-sci' ?
              <div>
                <div>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Option</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={option}
                      label="Option"
                      onChange={handleOptionChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {parsedCSOption.map((option) => <MenuItem value={option.value}>{option.label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </div>
              </div>
              :
              <div></div>
              }
          </div>
        </div>
        :
        <div></div>
        }
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
  
export default Roadmap;