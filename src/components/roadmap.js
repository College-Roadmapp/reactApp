import JsonDataDisplay from './jsonDataDisplay';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Header from './header';
import EngineeringCalculator from './tuition/engineeringCalculator'
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
      <div className="displayApp" key="appParentDiv">
        <div className = "dropDownMenu" key="ddParentDiv">
            {<DropDowns key="ddFunction"/>}
        </div>
      </div>
  )
}

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
      <div key="roadmap">
        <FormControl className="degreeSelection" sx={{ m: 1, minWidth: 120 }}>
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
            {parsedColleges.map((college) => <MenuItem value={college.value} key={college.label}>{college.label}</MenuItem>)}
          </Select>
        </FormControl>
        {college !== '' ?
        <div>
          <div>
              <FormControl className="degreeSelection" sx={{ m: 1, minWidth: 120 }}>
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
                    {college === "ag-sci" &&
                      parsedAgSciMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "business" &&
                      parsedBusMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "earth-ocean-atmos-science" &&
                      parsedEOASMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "education" &&
                      parsedEdMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "engineering" &&
                      parsedEngMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "forestry" &&
                      parsedForestryMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "liberal-arts" &&
                      parsedLibArtsMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "pharmacy" &&
                      parsedPharmMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "public-health-human-science" &&
                      parsedPubHealthMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }
                    {college === "science" &&
                      parsedSciMajors.map((major) => <MenuItem value={major.value} key={major.label}>{major.label}</MenuItem>)
                    }

                    </Select>
              </FormControl>

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
                      {parsedCSOption.map((option) => <MenuItem value={option.value} key={option.label}>{option.label}</MenuItem>)}
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
        <h1 className='printme'>
        {college === "ag-sci" && major === "ag-food-bus-mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "agSci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "an-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "bio-data" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "bioresource" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "botany" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "crop-soil" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "eco-eng" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "enviro-eco-policy" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "fish-wild" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "food-sci-tech" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "horticulture" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "range-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "ag-sci" && major === "sus-double" &&
        <JsonDataDisplay key="json" major={major}/>
        }

        {college === "business" && major === "acct" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "app-des" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "bus-admin" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "bus-analytics" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "bus-info-sys" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "des-inn-mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "finance" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "hosp-mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "inn-mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "int-des" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "marketing" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "merch-mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "business" && major === "supply-chain-mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }

        {college === "earth-ocean-atmos-science" && major === "climate-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "earth-ocean-atmos-science" && major === "enviro-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "earth-ocean-atmos-science" && major === "geo" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "earth-ocean-atmos-science" && major === "geo-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "earth-ocean-atmos-science" && major === "ocean-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }

        {college === "education" && major === "ed-double-deg" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "education" && major === "elem-ed" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "education" && major === "clin-elem-ed" &&
        <JsonDataDisplay key="json" major={major}/>
        }

        {college === "engineering" && major === "comp-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "civil" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "arch" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "bio-eng" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "construction-mgmt" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "eco" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "electric" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "energy-sys" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "enviro" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "industrial" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "manufacturing" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "mechanical" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "nuclear" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "engineering" && major === "radiation" &&
        <JsonDataDisplay key="json" major={major}/>
        }

        {college === "forestry" && major === "forestry" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "forestry" && major === "nat-resources" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "forestry" && major === "for-eng-civil-eng" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "forestry" && major === "ren-materials" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "forestry" && major === "tour-rec-adv-leader" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "forestry" && major === "tour-rec-adv-leader" &&
        <JsonDataDisplay key="json" major={major}/>
        }

        {college === "liberal-arts" && major === "amer-studies" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "anthro" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "art-history" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "art-media-tech" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "creative-writing" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "dig-comm-art" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "economics" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "english" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "ethnic-studies" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "french" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "german" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "graphic-design" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "history" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "inter-studies" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "lib-studies" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "marine-studies" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "music" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "music-studies" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "new-media-comm" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "philosophy" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "political-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "psychology" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "public-policy" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "religious-studies" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "social-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "sociology" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "spanish" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "speech-comm" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "liberal-arts" && major === "women-gender-sex" &&
        <JsonDataDisplay key="json" major={major}/>
        }

        {college === "pharmacy" && major === "pharmd" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "public-health-human-science" && major === "health-mgmt-policy" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "public-health-human-science" && major === "health-promo-behavior" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "public-health-human-science" && major === "human-dev-fam-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "public-health-human-science" && major === "kin" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "public-health-human-science" && major === "nutrition" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "biochem-biophys" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "biochem-molbio" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "biohealth-sci" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "bio" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "chem" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "math" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "microbio" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "physics" &&
        <JsonDataDisplay key="json" major={major}/>
        }
        {college === "science" && major === "zoology" &&
        <JsonDataDisplay key="json" major={major}/>
        }



        <EngineeringCalculator/>
        </h1>
        <button className='printButton' onClick={() => window.print()}>PRINT/SAVE AS PDF</button>
      </div>
  );
}

export default Roadmap;
