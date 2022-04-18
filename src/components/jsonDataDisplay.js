import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';



// ------------- variables for keeping track of progress ---------------
let totalProgress = 0;
let totalCoursesTaken = [];

// ------------------ class --------------------
class Course {
  constructor(id, name, credits, term, newIndex) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.term = term;
    this.completed = 0;
    this.newIndex = newIndex;
  }
}

// ------------------ degree --------------------
class Degree {
  constructor(){
    this.degree = [];
  }
  insertCourse(id, name, credits, term, newIndex){
    let c = new Course(id, name, credits, term, newIndex);
    this.degree.push(c);
  }
  removeCourse(idx){
    this.degree.splice(idx, 1);
  }
  get allCourses(){
    return this.degree;
  }
  get numberCourses(){
    return this.degree.length;
  }
  getCourse(index){
    return (this.degree[index]);
  }
  getName(index){
    return (this.degree[index].name);
  }
  getId(index){
    return (this.degree[index].id);
  }
  getCredits(index){
    return (this.degree[index].credits);
  }
  getTerm(index){
    return (this.degree[index].term);
  }
  //doesn't work once you move stuff around
  getIndex(courseId){
    for(let i = 0; i < this.degree.length; i++){
      if(this.degree[i].id === courseId)
        return i;
    }
  }
  getTermsArray(){
    let termArray = []
    for(let i = 0; i < this.degree.length; i++){
      termArray.push(this.degree[i].term)
    }
    return termArray;
  }
  setNewIndex(index, newIndex){
    this.degree[index].newIndex = newIndex
  }
  getNewIndex(index){
    return (this.degree[index].newIndex);
  }
}

// ------------------ checkbox --------------------
function ControlledCheckbox(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    //user has clicked the checkbox indicating the have taken the corresponding course
    if(event.target.checked === true){
      //setting 'completed' of course to 1 to keep track of status
      props.deg.getCourse(props.idx).completed = 1;
      //adding the course to the array of all courses completed by user
      if(!totalCoursesTaken.includes(props.deg.getCourse(props.idx).id)){
        totalCoursesTaken.push(props.deg.getCourse(props.idx).id);
        //adding the credits out of the pool of total credits completed
        totalProgress += props.deg.getCourse(props.idx).credits;
      }
    }
    //user has unclicked the checkbox indicating the have not taken the corresponding course
    else if(event.target.checked === false){
      //setting 'completed' of course to 0 to keep track of status
      props.deg.getCourse(props.idx).completed = 0;
      //remove the course from the array of all courses completed by user
      if(totalCoursesTaken.includes(props.deg.getCourse(props.idx).id)){
        var idx = totalCoursesTaken.indexOf(props.deg.getCourse(props.idx).id)
        totalCoursesTaken.splice(idx, 1);
        //taking the credits out of the pool of total credits completed
        totalProgress -= props.deg.getCourse(props.idx).credits;
      }
    }
    //********  this is where we will want to update progress bar and mark a course as completed ******
  };
  return (
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
  );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ------------------ roadmap --------------------
class Table  extends React.Component{

  constructor(props){
    super(props);
    this.array = props;
    this.size = props.numberCourses;
  }
}

// ------------------ creates initial roadmap --------------------
class JsonDataDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      termArray: [],
      isOpenArr: [],
      isOpen: false,
      term: 0,
      firstRun: true,
      test: null,
      previousTest: null,
      major: null
    };

    this.BasicModal = this.BasicModal.bind(this);
  }
  
  BasicModal(props) {
    // handling modal open
    const handleOpen = () => {
      this.setState({term: props.info.array.getTerm(props.info.array.getIndex(props.id))})
      //workaround for updating a single element in a state array
      let testArr = [...this.state.isOpenArr]
      let testItem = {...testArr[props.idx]}
      testItem = true
      testArr[props.idx] = testItem
      this.setState({isOpenArr: testArr})
    }
    // handling term dropdown selection; saves selection into term variable
    const allTermNums = [1,2,3,4,5,6,7,8,9,10,11,12]

    const handleTermChange = event => {
      this.setState({term: event.target.value});
    }
  
    //handling modal closing and updating given course's term
    const handleClose = () => {
      //workaround for updating a single element in a state array
      let testArr = [...this.state.isOpenArr]
      let testItem = {...testArr[props.idx]}
      testItem = false
      testArr[props.idx] = testItem
      this.setState({isOpenArr: testArr})
      // makes new course with updated term number and deleted old course with outdated term number
      let idx = props.info.array.getIndex(props.id)
      props.info.array.getCourse(idx).term = this.state.term
      this.setState({firstRun: false})
      this.setState({previousTest: props.info})
    }
  
    return (
      <div>
        <Button onClick={handleOpen}>Change Term</Button>
        <Modal
          open={this.state.isOpenArr[props.idx]}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Which term would you like to move this class to?
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Term</InputLabel>
              <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={this.state.term}
              label="Term"
              onChange={handleTermChange}
              >
                {allTermNums.map((termNum) => <MenuItem value={termNum}>{termNum}</MenuItem>)}
              </Select>
            </FormControl>
            <Button onClick={handleClose}>OK</Button>
          </Box>
        </Modal>
      </div>
    );
  }

  getHtml(termNum){
    //---------------------- assignTerms --------------------------------
    let info1 = null;
    if(this.state.firstRun === true){
      //gets degree plan based on json file
      let newDegree = this.IntoClassObjects();
      //puts that degree plan into a Table for the roadmap
      let newTable = new Table(newDegree);
      //start with term 1
      let termNumber = 1;
      //assigns term values; 4 classes per term based on order they appear in json
      for(let i=0; i < newTable.size; i++){
        //setting each course's term number based on which term we are rendering it
        newTable.props.getCourse(i).term = termNumber
        //increments the term number after 4 classes have been added
        if((i + 1) % 4 === 0){
          termNumber += 1
        }
      }
      info1 = newTable
    }
    else{
      info1 = this.state.previousTest
    }

    //-------------------------------------------------------------------
      for(let i = 0; i < info1.array.degree.length; i++){
        if(this.state.isOpenArr.length < info1.array.degree.length){
          this.state.isOpenArr.push(false)
        }

    //------------------------ start of original getHtml ---------------------------

    //empty array that will hold the current term's courses
    var temp= [];
    //setting temp array of courses based on term number of course components and termNum
      //assigns values for each element from degree plan that is calling the function
    for(let i=0; i < info1.size; i++){
      if(info1.array.getTerm(i) === termNum){
        temp.push(info1.array.getCourse(i));
      }
    }
    //creating html for each element of temp using json data
    temp=temp.map(
        (info, i)=>{
            return(
                <tr>
                    <td>
                      <ControlledCheckbox id={info.id} deg={info.array} idx={(termNum-1)*4 + i}/>
                    </td>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.credits}</td>
                    <td>
                      <this.BasicModal info={info1} id={temp[i].id} idx={(termNum-1)*4 + i}/>
                    </td>
                </tr>
            );
        }
    )
    //uses temp array to render a table with temp's html
    return(
        <div>
            <table className="table table-striped">
              <caption> Term {termNum} </caption>
                <thead>
                    <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    </tr>
                </thead>
                <tbody>
                    {temp}
                </tbody>
            </table>
        </div>
    );
  }
  }

  IntoClassObjects(){
    //******* this will have to be conditional based on dropdown selection *****
    var curMajor;
    console.log('=== major', curMajor);
    var parsedJSON;
    if (curMajor === 'comp-sci'){
      parsedJSON = require('./../parseHTML/Success/Computer Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'ag-food-bus-mgmt') {
      parsedJSON = require('./../parseHTML/Success/Agricultural and Food Business Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'agSci') {
      parsedJSON = require('./../parseHTML/Success/Agricultural Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'an-sci') {
      parsedJSON = require('./../parseHTML/Success/Animal Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bio-data') {
      parsedJSON = require('./../parseHTML/Success/Biological Data Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bioresource') {
      parsedJSON = require('./../parseHTML/FailedGrab/Bioresource Research Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'botany') {
      parsedJSON = require('./../parseHTML/Success/Botany Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'crop-soil') {
      parsedJSON = require('./../parseHTML/Success/Crop and Soil Science Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'eco-eng') {
      parsedJSON = require('./../parseHTML/Success/Ecological Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'enviro-eco-policy') {
      parsedJSON = require('./../parseHTML/Success/Environmental Economics and Policy Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'fish-wild') {
      parsedJSON = require('./../parseHTML/Success/Fisheries and Wildlife Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'food-sci-tech') {
      parsedJSON = require('./../parseHTML/Success/Food Science and Technology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'horticulture') {
      parsedJSON = require('./../parseHTML/Success/Horticulture Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'range-sci') {
      parsedJSON = require('./../parseHTML/Success/Rangeland Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'sus-double') {
      parsedJSON = require('./../parseHTML/Success/Sustainability Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'acct') {
      parsedJSON = require('./../parseHTML/Success/Accountancy Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'app-des') {
      parsedJSON = require('./../parseHTML/Success/Apparel Design Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bus-admin') {
      parsedJSON = require('./../parseHTML/Success/Business Administration Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'bus-analytics') {
      parsedJSON = require('./../parseHTML/Success/Business Analytics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bus-info-sys') {
      parsedJSON = require('./../parseHTML/Success/Business Information Systems Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'des-inn-mgmt') {
      parsedJSON = require('./../parseHTML/Success/Design and Innovation Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'finance') {
      parsedJSON = require('./../parseHTML/Success/Finance Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'hosp-mgmt') {
      parsedJSON = require('./../parseHTML/Success/Hospitality Management Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'inn-mgmt') {
      parsedJSON = require('./../parseHTML/Success/Innovation Management Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'int-des') {
      parsedJSON = require('./../parseHTML/Success/Interior Design Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'mgmt') {
      parsedJSON = require('./../parseHTML/Success/Management Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'marketing') {
      parsedJSON = require('./../parseHTML/Success/Marketing Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'merch-mgmt') {
      parsedJSON = require('./../parseHTML/Success/Merchandising Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'supply-chain-mgmt') {
      parsedJSON = require('./../parseHTML/Success/Supply Chain and Logistics Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'climate-sci') {
      parsedJSON = require('./../parseHTML/Success/Climate Science Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'enviro-sci') {
      parsedJSON = require('./../parseHTML/Success/Environmental Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'geo-sci') {
      parsedJSON = require('./../parseHTML/Success/Geography and Geospatial Science Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'geo') {
      parsedJSON = require('./../parseHTML/Success/Geology Undergraduate Major (BS, HBS).json');
    }
    // else if (curMajor === 'ocean-sci') {
    //   parsedJSON = require('./../parseHTML/Success/');
    // }
    else if (curMajor === 'ed-double-deg') {
      parsedJSON = require('./../parseHTML/Success/Education Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    // else if (curMajor === 'elem-ed') {
    //   parsedJSON = require('./../parseHTML/F');
    // }
    // else if (curMajor === 'clin-elem-ed') {
    //   parsedJSON = require('./../parseHTML/Success/Clin');
    // }
    else if (curMajor === 'arch') {
      parsedJSON = require('./../parseHTML/Success/Architectural Engineering Undergraduate Major (BS, HBS).json');
    }
    // else if (curMajor === 'bio') {
    //   parsedJSON = require('./../parseHTML/Success/bio');
    // }
    else if (curMajor === 'chem') {
      parsedJSON = require('./../parseHTML/Success/Chemical Engineering Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'civil') {
      parsedJSON = require('./../parseHTML/Success/Civil Engineering Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'comp-sci') {
      parsedJSON = require('./../parseHTML/Success/Computer Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }    
    else if (curMajor === 'construction-mgmt') {
      parsedJSON = require('./../parseHTML/Success/Construction Engineering Management Undergraduate Major (BA, BS, HBA, HBS).json');
    }    
    else if (curMajor === 'eco') {
      parsedJSON = require('./../parseHTML/Success/Ecological Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'electric') {
      parsedJSON = require('./../parseHTML/Success/Electrical and Computer Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'energy-sys') {
      parsedJSON = require('./../parseHTML/Success/Energy Systems Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'enviro') {
      parsedJSON = require('./../parseHTML/Success/Environmental Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'industrial') {
      parsedJSON = require('./../parseHTML/FailedGrab/Industrial Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'manufacturing') {
      parsedJSON = require('./../parseHTML/FailedGrab/Manufacturing Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'mechanical') {
      parsedJSON = require('./../parseHTML/FailedGrab/Mechanical Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'nuclear') {
      parsedJSON = require('./../parseHTML/FailedGrab/Nuclear Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'radiation') {
      parsedJSON = require('./../parseHTML/FailedGrab/Radiation Health Physics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'forestry') {
      parsedJSON = require('./../parseHTML/FailedGrab/Forestry Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'nat-resources') {
      parsedJSON = require('./../parseHTML/Success/Natural Resources Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'for-eng-civil-eng') {
      parsedJSON = require('./../parseHTML/FailedGrab/Forest Engineering - Civil Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'ren-materials') {
      parsedJSON = require('./../parseHTML/Success/Renewable Materials Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'tour-rec-adv-leader') {
      parsedJSON = require('./../parseHTML/Success/Tourism, Recreation, and Adventure Leadership Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'amer-studies') {
      parsedJSON = require('./../parseHTML/Success/American Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'anthro') {
      parsedJSON = require('./../parseHTML/Success/Anthropology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'art-history') {
      parsedJSON = require('./../parseHTML/Success/Art Undergraduate Major (BA, BFA, BS, HBA, HBFA, HBS).json');
    }
    else if (curMajor === 'art-media-tech') {
      parsedJSON = require('./../parseHTML/Success/Arts, Media, and Technology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'creative-writing') {
      parsedJSON = require('./../parseHTML/Success/Creative Writing Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'dig-comm-art') {
      parsedJSON = require('./../parseHTML/Success/Digital Communication Arts Undergraduate Major (BA, BFA, BS, HBA, HBFA, HBS).json');
    }
    else if (curMajor === 'economics') {
      parsedJSON = require('./../parseHTML/Success/Economics Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'english') {
      parsedJSON = require('./../parseHTML/Success/English Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'ethnic-studies') {
      parsedJSON = require('./../parseHTML/Success/Ethnic Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'french') {
      parsedJSON = require('./../parseHTML/Success/French Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'german') {
      parsedJSON = require('./../parseHTML/Success/German Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'graphic-design') {
      parsedJSON = require('./../parseHTML/Success/Graphic Design Undergraduate Major (BFA, HBFA).json');
    }
    else if (curMajor === 'history') {
      parsedJSON = require('./../parseHTML/Success/History Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'inter-studies') {
      parsedJSON = require('./../parseHTML/Success/Interior Design Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'lib-studies') {
      parsedJSON = require('./../parseHTML/FailedGrab/Liberal Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'marine-studies') {
      parsedJSON = require('./../parseHTML/Success/Marine Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'music') {
      parsedJSON = require('./../parseHTML/Success/Music Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'music-studies') {
      parsedJSON = require('./../parseHTML/Success/Music Studies Undergraduate Major (BM, HBM).json');
    }
    // else if (curMajor === 'new-media-comm') {
    //   parsedJSON = require('./../parseHTML/Success/media');
    // }
    else if (curMajor === 'philosophy') {
      parsedJSON = require('./../parseHTML/Success/Philosophy Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'political-sci') {
      parsedJSON = require('./../parseHTML/Success/Political Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'psychology') {
      parsedJSON = require('./../parseHTML/Success/Psychology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'public-policy') {
      parsedJSON = require('./../parseHTML/Success/Public Policy Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'religious-studies') {
      parsedJSON = require('./../parseHTML/Success/Religious Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'social-sci') {
      parsedJSON = require('./../parseHTML/Success/Social Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'sociology') {
      parsedJSON = require('./../parseHTML/Success/Sociology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'spanish') {
      parsedJSON = require('./../parseHTML/Success/Spanish Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'speech-comm') {
      parsedJSON = require('./../parseHTML/FailedGrab/Speech Communication Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'women-gender-sex') {
      parsedJSON = require('./../parseHTML/Success/Women, Gender, and Sexuality Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    // else if (curMajor === 'pharmd') {
    //   parsedJSON = require('./../parseHTML/Success/Phar');
    // }
    // else if (curMajor === 'health-mgmt-policy') {
    //   parsedJSON = require('./../parseHTML/Success/hea');
    // }
    // else if (curMajor === 'health-promo-behavior') {
    //   parsedJSON = require('./../parseHTML/Success/Civil Engineering Undergraduate Major (BA, BS, HBA, HBS).json');
    // }
    else if (curMajor === 'human-dev-fam-sci') {
      parsedJSON = require('./../parseHTML/Success/Human Development and Family Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'kin') {
      parsedJSON = require('./../parseHTML/Success/Kinesiology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'nutrition') {
      parsedJSON = require('./../parseHTML/FailedGrab/Nutrition Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'biochem-biophys') {
      parsedJSON = require('./../parseHTML/Success/Biochemistry and Biophysics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'biochem-molbio') {
      parsedJSON = require('./../parseHTML/Success/Biochemistry and Molecular Biology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'biohealth-sci') {
      parsedJSON = require('./../parseHTML/Success/BioHealth Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bio') {
      parsedJSON = require('./../parseHTML/Success/Biology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'chem') {
      parsedJSON = require('./../parseHTML/Success/Chemistry Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'math') {
      parsedJSON = require('./../parseHTML/Success/Mathematics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'microbio') {
      parsedJSON = require('./../parseHTML/Success/Microbiology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'physics') {
      parsedJSON = require('./../parseHTML/Success/Physics Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'zoology') {
      parsedJSON = require('./../parseHTML/Success/Zoology Undergraduate Major (BS, HBS).json');
    }
    else {
      parsedJSON = require('./../parseHTML/Success/Computer Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    var result = parsedJSON.Courses;
    //create new degree plan to put the json in
    let newDegree = new Degree();
    //loop through each course found in the json file and add it to the Degree Class component
    for(let i=0; i < result.length; i++){
      newDegree.insertCourse(result[i].code, result[i].title, 4, 0, 0);
    }
    return newDegree;
  }

  assignTerms(){
    //gets degree plan based on json file
    let newDegree = this.IntoClassObjects();
    //puts that degree plan into a Table for the roadmap
    let newTable = new Table(newDegree);
    //start with term 1
    let termNum = 1;
    //assigns term values; 4 classes per term based on order they appear in json
    for(let i=0; i < newTable.size; i++){
      //setting each course's term number based on which term we are rendering it
      newTable.props.getCourse(i).term = termNum
      //increments the term number after 4 classes have been added
      if((i + 1) % 4 === 0){
        termNum += 1
      }
    }
    return newTable;
  }
  

  //brand new Table with json values
  render() {
    const allTermNums = [1,2,3,4,5,6,7,8,9,10,11,12]
    return(
      <div key="tableParent">
        <div className="Tables" key="parentDiv">
            {allTermNums.map((term) => 
              <div className="classTable" key={term}>
                {this.getHtml(term)}
              </div>
            )}
        </div>
      </div>
    )
  }
}

export default JsonDataDisplay;