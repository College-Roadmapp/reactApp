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
import ProgressBar from "@ramonak/react-progress-bar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

//theme for the change term modal
const theme = createTheme({
  palette: {
    primary: {
      // black
      main: '#373737',
      disableElevation: 1,
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

// ------------------ course class --------------------
class Course {
  constructor(id, name, bacc, baccIndex, credits, term, newIndex) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.term = term;
    this.completed = 0;
    this.newIndex = newIndex;
    this.bacc = bacc;
    this.baccIndex = baccIndex;
  }
}

// ------------------ degree class --------------------
class Degree {
  constructor(){
    this.degree = [];
  }
  //function to insert new course into degree
  insertCourse(id, name, bacc, baccIndex, credits, term, newIndex){
    let c = new Course(id, name, bacc, baccIndex, credits, term, newIndex);
    this.degree.push(c);
  }
  //function to remove course from a degree
  removeCourse(idx){
    this.degree.splice(idx, 1);
  }
  //returns all courses
  get allCourses(){
    return this.degree;
  }
  //returns the number of courses
  get numberCourses(){
    return this.degree.length;
  }
  //returns the course based on the index in degree
  getCourse(index){
    return (this.degree[index]);
  }
  //returns course name based on the index in the degree
  getName(index){
    return (this.degree[index].name);
  }
  //returns course id based on the index in the degree
  getId(index){
    return (this.degree[index].id);
  }
  //returns course credits based on the index in the degree
  getCredits(index){
    return (this.degree[index].credits);
  }
  //returns the term a course is in based on the index in the degree
  getTerm(index){
    return (this.degree[index].term);
  }
  //returns the index of a course within the degree based on its id
  getIndex(courseId){
    for(let i = 0; i < this.degree.length; i++){
      if(this.degree[i].id === courseId)
        return i;
    }
  }
  //returns the index of a course within the degree based on its id
  getNewIndex(courseId){
    for(let i = 0; i < this.degree.length; i++){
      if(this.degree[i].id === courseId)
        return this.degree[i].newIndex;
    }
  }
  //returns the total number of credits in entire degree
  getTotalCredits(){
    let credits = 0;
    for(let i =0; i < this.degree.length; i++){
      credits += Number(this.degree[i].credits);
    }
    return credits;
  }
}

// styling for the change term modal
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

//global variable to compare to dropdown selection of major to see
  //when the selection has changed (used primarily in render)
var currentMajor
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
      previousTest: null,
      isCheckedArr: [],
      isChecked: false,
      totalCoursesTaken: [],
      currentMajor: null,
      baccoreCourses: Array(14).fill("None")
    };
    this.coursesPerTermArray = Array(12).fill(0)
    this.totalProgress = 0
    this.totalCredits = 0
    this.IntoClassObjects = this.IntoClassObjects.bind(this);
    this.BasicModal = this.BasicModal.bind(this);
    this.ControlledCheckbox = this.ControlledCheckbox.bind(this);
    this.CourseDropdown = this.CourseDropdown.bind(this);
    this.IntoClassObjects = this.IntoClassObjects.bind(this);
    this.getHtml = this.getHtml.bind(this)
  }


  //---------- checkbox component: for user to mark already completed courses, ----------
  //---------- and in turn calculate total progress ----------
  ControlledCheckbox(props) {
    const handleChange = (event) => {
      let copyOfTotalCoursesTaken = [...this.state.totalCoursesTaken]
      //user has clicked the checkbox indicating the have taken the corresponding course
      if(event.target.checked === true){
        //set index in isCheckedArr to true at same index of course in degree array
        let testArr = [...this.state.isCheckedArr]
        testArr[props.idx] = true
        this.setState({isCheckedArr: testArr})
        //setting 'completed' of course to 1 to keep track of status
        props.deg.array.getCourse(props.idx).completed = 1;
        //adding the course to the array of all courses completed by user
        if(!copyOfTotalCoursesTaken.includes(props.deg.array.getCourse(props.idx).id)){
          this.state.totalCoursesTaken.push(props.deg.array.getCourse(props.idx).id)
          //adding the credits out of the pool of total credits completed
          this.totalCredits += Number(props.deg.array.getCourse(props.idx).credits)
          this.totalProgress = this.totalCredits/props.deg.array.getTotalCredits() * 100
        }
      }
      //user has unclicked the checkbox indicating the have not taken the corresponding course
      else if(event.target.checked === false){
        //set index in isCheckedArr to false at same index of course in degree array
        let testArr = [...this.state.isCheckedArr]
        testArr[props.idx] = false
        this.setState({isCheckedArr: testArr})
        //setting 'completed' of course to 0 to keep track of status
        props.deg.array.getCourse(props.idx).completed = 0;
        //remove the course from the array of all courses completed by user
        if(copyOfTotalCoursesTaken.includes(props.deg.array.getCourse(props.idx).id)){
          var idx = copyOfTotalCoursesTaken.indexOf(props.deg.array.getCourse(props.idx).id)
          this.state.totalCoursesTaken.splice(idx, 1)
          //taking the credits out of the pool of total credits completed
          this.totalCredits -= Number(props.deg.array.getCourse(props.idx).credits)
          this.totalProgress = this.totalCredits/props.deg.array.getTotalCredits() * 100
        }
      }
    };
    return (
        <Checkbox
          checked={this.state.isCheckedArr[props.idx]}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
    );
  }

  //---------- modal component: pops up when user clicks "Change Term" on a course and presents ----------
  //---------- them with a dropdown of term options to move that course to ----------
  //---------- handleClose then moves this course accordingly on the roadmap ----------
  BasicModal(props) {
    // handling modal open
    const handleOpen = () => {
      this.setState({term: props.info.array.getTerm(props.info.array.getIndex(props.id))})
      //workaround for updating a single element in a state array
      let testArr = [...this.state.isOpenArr]
      let testItem = {...testArr[props.idx]}
      testItem = true
      testArr[props.idx] = testItem
      //sets same index in isOpenArr to true as course in roadmap's index, now that modal has opened
      this.setState({isOpenArr: testArr})
    }
    // handling term dropdown selection; saves selection into term variable
    const allTermNums = [1,2,3,4,5,6,7,8,9,10,11,12,"Holder"]
    //sets dropdown option to state variable 'term'
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
      //sets same index in isOpenArr to false as course in roadmap's index, now that modal is closing
      this.setState({isOpenArr: testArr})
      // get index of course
      let idx = props.info.array.getIndex(props.id)
      //check that user didn't move course to "Holder" term
      if(this.state.term !== "Holder"){
        // set term value of course to selected dropdown option
        props.info.array.getCourse(idx).term = this.state.term
      }
      //if the user moved the course to the holder term, give it the term number 13 
        //(need a number not string)
      else{
        props.info.array.getCourse(idx).term = 13
      }
      //setting state variables to not automatically render roadmap as it would by default
          //because courses have moved around now, and we want it to stay that way
      this.setState({firstRun: false})
      this.setState({previousTest: props.info})
    }

    return (
      <div>
        <ThemeProvider theme={theme}>
        <Button onClick={handleOpen} size="small" sx={{fontSize: 11}} >change term </Button>
        </ThemeProvider>
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

  //---------- course dropdown component: displays options for baccore based on which ----------
  //---------- baccore category is selected, and then when a course from dropdown is ----------
  //---------- selected, it remains that visible on the roadmap ----------
  CourseDropdown(props){
    //when dropdown on a baccore course is opened:
    const handleChange = event => {
      //create a temporary array copying bacccore courses
      let tempArr = [...this.state.baccoreCourses]
      //set the value of the chosen dropdown open to that corresponding baccore section
      tempArr[props.idx] = event.target.value
      this.setState({baccoreCourses: tempArr})
    }
    return (
      <Box sx={{ minWidth: 90, maxHeight: 40, fontSize: 11, lineHeigh: 0, pt:1}}>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label"></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.baccoreCourses[props.idx]}
            onChange={handleChange}
            size="small"
            style={{fontSize: 11}}
          >
            {props.name.courses.map(({code, title, credits}) => <MenuItem value={code} sx={{fontSize: 11}}>{code}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    )
  }

  //---------- getHtml component: on the first render for a major, this function ----------
  //---------- assigns each course a term number that will evenly distribute the ----------
  //---------- courses amoung the 12 terms ----------
  //---------- If this has already been done for a given major, it will skip that step ----------
  //---------- to avoid resetting any courses that a user has moved to a different major ----------
  //---------- Then, it makes an array of html for each course, and renders all of them ----------
  //---------- into the roadmap ----------
  getHtml(termNum){
    let info1 = null; 
    this.coursesPerTermArray = Array(12).fill(0)
    //if it a new major has been selected, then this conditional statement will
      //give each course a term by default, otherwise it will leave the term numbers as they are
    if(this.state.firstRun === true){
      //gets degree plan based on json file
      let newDegree = this.IntoClassObjects();
      //puts that degree plan into a Table for the roadmap
      let newTable = new Table(newDegree);
      //start with term 1
      let termNumber = 1;
      //idx for this.coursesPerTermArray
      let idx = 0;
      //count up to the number of courses per term, then move to next term
      let count = 0;
      //calculate courses per term by dividing into 12 terms
      let coursesPerTerm = Math.floor(newTable.size / 12)
      //then we will spread the remaining courses amoung the first few terms until none remaining
      let remainderTerms = newTable.size % 12
      //create array of courses per term with value of how many should be per term
      this.coursesPerTermArray = Array(12).fill(coursesPerTerm)
      //then allocate terms for any remaining courses
      for(let i =0; i < remainderTerms; i++){
        this.coursesPerTermArray[i]++
      }
      //give each course a term number based on how many courses are needed per term
      for(let i = 0; i < newTable.size; i++){
        newTable.props.getCourse(i).term = termNumber
        count++
        if(this.coursesPerTermArray[idx] === count){
          termNumber += 1
          idx += 1
          count = 0
        }
      }
      info1 = newTable
    }
    //the current major has an in-progress roadmap, so we don't change it
    else{
      info1 = this.state.previousTest
    }
    //set isOpenArr and isChecked arr to false for the length of the degree
    for(let i = 0; i < info1.array.degree.length; i++){
      if(this.state.isOpenArr.length < info1.array.degree.length){
        this.state.isOpenArr.push(false)
      }
      if(this.state.isCheckedArr.length < info1.array.degree.length){
        this.state.isCheckedArr.push(false)
      }
    }
    //empty array that will hold the current term's courses
    var temp= [];
    //setting temp array of courses based on term number of course components and termNum
      //assigns values for each element from degree plan that is calling the function
    for(let i=0; i < info1.size; i++){
      if(info1.array.getTerm(i) === termNum){
        temp.push(info1.array.getCourse(i));
      }
    }
    //create html of each course, checking if it is baccore or not, because baccore is rendered
      //slightly differently since we don't know the course ID the user will choose
    temp=temp.map(
      (info, i)=>{
          return(
            <tbody>
            {info.name === "BACC*" ?
              <tr>
                  <td>
                    <this.ControlledCheckbox id={info.id} deg={info1} idx={info.newIndex}/>
                  </td>
                  <td className="courseId">{info.id}</td>
                  <this.CourseDropdown id={info.id} credits={info.credits} name={info.bacc} idx={info.newIndex}/>
                  <td className="courseCredits">{info.credits}</td>
                  <td>
                    <this.BasicModal info={info1} id={temp[i].id} idx={info.newIndex}/>
                  </td>
              </tr>
              :
              <tr>
                <td>
                  <this.ControlledCheckbox id={info.id} deg={info1} idx={info.newIndex}/>
                </td>
                <td className="courseId">{info.id}</td>
                <td className="courseName">{info.name}</td>
                <td className="courseCredits">{info.credits}</td>
                <td>
                  <this.BasicModal info={info1} id={temp[i].id} idx={info.newIndex}/>
                </td>
                </tr>
            }
            </tbody>
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
                <th className="tableLabels"> Complete </th>
                <th className="tableLabels"> Course ID  </th>
                <th className="tableLabels"> Course Name </th>
                <th className="tableLabels"> Credits </th>
                <th className="tableLabels"> Relocate </th>
                </tr>
            </thead>
            {temp}
        </table>
    </div>
    );
  }

  //---------- IntoClassObject component: when a new major is selected based on the ----------
  //---------- dropdown, this functional component gets the json for that major and ----------
  //---------- inserts all of its courses plus baccore into a degree ----------
  IntoClassObjects(){
    var curMajor = this.props.major;
    var parsedJSON;
    if (curMajor === 'comp-sci'){
      parsedJSON = require('./../data/Colleges/College of Engineering/Computer Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'ag-food-bus-mgmt') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Agricultural and Food Business Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'agSci') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Agricultural Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'an-sci') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Animal Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bio-data') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Biological Data Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bioresource') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Biological Data Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'botany') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Botany Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'crop-soil') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Crop and Soil Science Undergraduate Major (BS, HBS).json');
    }
    // else if (curMajor === 'eco-eng') {
    //   parsedJSON = require('./../parseHTML/Success/Ecological Engineering Undergraduate Major (BS, HBS).json');
    // }
    // else if (curMajor === 'enviro-eco-policy') {
    //   parsedJSON = require('./../parseHTML/Success/Environmental Economics and Policy Undergraduate Major (BS, HBS).json');
    // }
    else if (curMajor === 'fish-wild') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Fisheries and Wildlife Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'food-sci-tech') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Food Science and Technology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'horticulture') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Horticulture Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'range-sci') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Rangeland Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'sus-double') {
      parsedJSON = require('./../data/Colleges/College of Agricultural Sciences/Sustainability Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'acct') {
      parsedJSON = require('./../data/Colleges/College of Business/Accountancy Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'app-des') {
      parsedJSON = require('./../data/Colleges/College of Business/Apparel Design Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bus-admin') {
      parsedJSON = require('./../data/Colleges/College of Business/Business Administration Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'bus-analytics') {
      parsedJSON = require('./../data/Colleges/College of Business/Business Analytics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bus-info-sys') {
      parsedJSON = require('./../data/Colleges/College of Business/Business Information Systems Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'des-inn-mgmt') {
      parsedJSON = require('./../data/Colleges/College of Business/Design and Innovation Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'finance') {
      parsedJSON = require('./../data/Colleges/College of Business/Finance Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'hosp-mgmt') {
      parsedJSON = require('./../data/Colleges/College of Business/Hospitality Management Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    // else if (curMajor === 'inn-mgmt') {
    //   parsedJSON = require('./../parseHTML/Success/Innovation Management Undergraduate Major (BA, BS, HBA, HBS).json');
    // }
    else if (curMajor === 'int-des') {
      parsedJSON = require('./../data/Colleges/College of Business/Interior Design Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'mgmt') {
      parsedJSON = require('./../data/Colleges/College of Business/Management Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'marketing') {
      parsedJSON = require('./../data/Colleges/College of Business/Marketing Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'merch-mgmt') {
      parsedJSON = require('./../data/Colleges/College of Business/Merchandising Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'supply-chain-mgmt') {
      parsedJSON = require('./../data/Colleges/College of Business/Supply Chain and Logistics Management Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'climate-sci') {
      parsedJSON = require('./../data/Colleges/College of Earth, Ocean, and Atmospheric Sciences/Climate Science Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'enviro-sci') {
      parsedJSON = require('./../data/Colleges/College of Earth, Ocean, and Atmospheric Sciences/Environmental Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'geo-sci') {
      parsedJSON = require('./../data/Colleges/College of Earth, Ocean, and Atmospheric Sciences/Geography and Geospatial Science Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'geo') {
      parsedJSON = require('./../data/Colleges/College of Earth, Ocean, and Atmospheric Sciences/Geology Undergraduate Major (BS, HBS).json');
    }
    // else if (curMajor === 'ocean-sci') {
    //   parsedJSON = require('./../parseHTML/Success/');
    // }
    else if (curMajor === 'ed-double-deg') {
      parsedJSON = require('./../data/Colleges/College of Education/Education Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'elem-ed') {
      parsedJSON = require('./../data/Colleges/College of Education/Teaching Undergraduate Major (BS, HBS).json');
    }
    // else if (curMajor === 'clin-elem-ed') {
    //   parsedJSON = require('./../parseHTML/Success/Clin');
    // }
    else if (curMajor === 'arch') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Architectural Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bio-eng') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Bioengineering Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'chem-eng') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Chemical Engineering Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'civil') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Civil Engineering Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'comp-sci') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Computer Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'construction-mgmt') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Construction Engineering Management Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'eco') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Ecological Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'electric') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Electrical and Computer Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'energy-sys') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Engineering Science Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'enviro') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Environmental Engineering Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'industrial') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Industrial Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'manufacturing') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Manufacturing Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'mechanical') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Mechanical Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'nuclear') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Nuclear Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'radiation') {
      parsedJSON = require('./../data/Colleges/College of Engineering/Radiation Health Physics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'forestry') {
      parsedJSON = require('./../data/Colleges/College of Forestry/Forestry Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'nat-resources') {
      parsedJSON = require('./../data/Colleges/College of Forestry/Natural Resources Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'for-eng-civil-eng') {
      parsedJSON = require('./../data/Colleges/College of Forestry/Forest Engineering - Civil Engineering Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'ren-materials') {
      parsedJSON = require('./../data/Colleges/College of Forestry/Renewable Materials Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'tour-rec-adv-leader') {
      parsedJSON = require('./../data/Colleges/College of Forestry/Tourism, Recreation, and Adventure Leadership Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'amer-studies') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/American Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'anthro') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Anthropology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'art-history') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Art Undergraduate Major (BA, BFA, BS, HBA, HBFA, HBS).json');
    }
    else if (curMajor === 'art-media-tech') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Arts, Media, and Technology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'creative-writing') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Creative Writing Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'dig-comm-art') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Digital Communication Arts Undergraduate Major (BA, BFA, BS, HBA, HBFA, HBS).json');
    }
    else if (curMajor === 'economics') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Economics Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'english') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/English Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'ethnic-studies') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Ethnic Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'french') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/French Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'german') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/German Undergraduate Major (BA, HBA).json');
    }
    else if (curMajor === 'graphic-design') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Graphic Design Undergraduate Major (BFA, HBFA).json');
    }
    else if (curMajor === 'history') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/History Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    // else if (curMajor === 'inter-studies') {
    //   parsedJSON = require('./../parseHTML/Success/Interior Design Undergraduate Major (BS, HBS).json');
    // }
    // else if (curMajor === 'lib-studies') {
    //   parsedJSON = require('./../parseHTML/FailedGrab/Liberal Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    // }
    else if (curMajor === 'marine-studies') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Marine Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'music') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Music Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'music-studies') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Music Studies Undergraduate Major (BM, HBM).json');
    }
    // else if (curMajor === 'new-media-comm') {
    //   parsedJSON = require('./../data/Colleges/College of Liberal Arts/');
    // }
    else if (curMajor === 'philosophy') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Philosophy Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'political-sci') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Political Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'psychology') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Psychology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'public-policy') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Public Policy Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'religious-studies') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Religious Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'social-sci') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Social Science Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'sociology') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Sociology Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'spanish') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Spanish Undergraduate Major (BA, HBA).json');
    }
    // else if (curMajor === 'speech-comm') {
    //   parsedJSON = require('./../parseHTML/FailedGrab/Speech Communication Undergraduate Major (BA, BS, HBA, HBS).json');
    // }
    else if (curMajor === 'women-gender-sex') {
      parsedJSON = require('./../data/Colleges/College of Liberal Arts/Women, Gender, and Sexuality Studies Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    // else if (curMajor === 'pharmd') {
    //   parsedJSON = require('./../data/Colleges/College of Public Health and Human Sciences/');
    // }
    // else if (curMajor === 'health-mgmt-policy') {
    //   parsedJSON = require('./../parseHTML/Success/hea');
    // }
    // else if (curMajor === 'health-promo-behavior') {
    //   parsedJSON = require('./../parseHTML/Success/Civil Engineering Undergraduate Major (BA, BS, HBA, HBS).json');
    // }
    else if (curMajor === 'human-dev-fam-sci') {
      parsedJSON = require('./../data/Colleges/College of Public Health and Human Sciences/Human Development and Family Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'kin') {
      parsedJSON = require('./../data/Colleges/College of Public Health and Human Sciences/Kinesiology Undergraduate Major (BS, HBS).json');
    }
    // else if (curMajor === 'nutrition') {
    //   parsedJSON = require('./../parseHTML/FailedGrab/Nutrition Undergraduate Major (BS, HBS).json');
    // }
    else if (curMajor === 'biochem-biophys') {
      parsedJSON = require('./../data/Colleges/College of Science/Biochemistry and Biophysics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'biochem-molbio') {
      parsedJSON = require('./../data/Colleges/College of Science/Biochemistry and Molecular Biology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'biohealth-sci') {
      parsedJSON = require('./../data/Colleges/College of Science/BioHealth Sciences Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'bio') {
      parsedJSON = require('./../data/Colleges/College of Science/Biology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'chem') {
      parsedJSON = require('./../parseHTML/Success/Chemistry Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'math') {
      parsedJSON = require('./../data/Colleges/College of Science/Mathematics Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'microbio') {
      parsedJSON = require('./../data/Colleges/College of Science/Microbiology Undergraduate Major (BS, HBS).json');
    }
    else if (curMajor === 'physics') {
      parsedJSON = require('./../data/Colleges/College of Science/Physics Undergraduate Major (BA, BS, HBA, HBS).json');
    }
    else if (curMajor === 'zoology') {
      parsedJSON = require('./../data/Colleges/College of Science/Zoology Undergraduate Major (BS, HBS).json');
    }
    else {
      parsedJSON = require('./../data/Fail/fail.json');
      console.log('Failed');
    }
    var result = parsedJSON.Courses;
    //sets currentMajor to current dropdown selection
    currentMajor = this.props.major
    //make a new degree for newly selected major
    let newDegree = new Degree();
    //get baccore json data
    var tempBaccCore = require('./../parseHTML/BaccCore/temporaryBaccCore.json')
    //push baccore courses first
    for(let i = 0; i < tempBaccCore.BaccCoreCourses.length; i++){
      newDegree.insertCourse(tempBaccCore.BaccCoreCourses[i].name, "BACC*", tempBaccCore.BaccCoreCourses[i], i, tempBaccCore.BaccCoreCourses[i].credits, 0, i)
    }
    //then push all major-related courses
    for(let i=0; i < result.length; i++){
      newDegree.insertCourse(result[i].code, result[i].title, null, null, result[i].credits || 4, 0, i + 14);
    }
    return newDegree;
  }

  //render a brand new Table with json values
  render() {
    const allTermNums = [1,2,3,4,5,6,7,8,9,10,11,12]
    //if global major variable changed and the user had clicked checkboxes and 
      //in turn updates the total progress count, reset them all back to 0/empty
    if(currentMajor !== this.props.major && this.totalProgress !== 0 && this.state.isCheckedArr !== []){
      this.totalProgress = 0
      this.totalCredits = 0;
      this.setState({isCheckedArr: []})
    }
    //reset the firstRun back to true if a new major is selected
    if(currentMajor !== this.props.major && this.state.firstRun !== true){
      this.setState({firstRun: true})
    }
    return(
        <div key="tableParent">
          <div className="Tables" key="parentDiv">
              {allTermNums.map((term) =>
                <div className="classTable" key={term}>
                  {this.getHtml(term)}
                </div>
              )}
              <div className="classTable" key={13}>
                {this.getHtml(13)}
              </div>
          </div>
          <div className="containerBar">
            <ProgressBar
            completed={Math.round(this.totalProgress)}
            height="40px"
            width="80%"
            margin="25px"
            labelAlignment="right"
            baseBgColor="rgba(0, 0, 0, 0.35)"
            bgColor="#d73f09"
            />
          </div>
        </div>
    )
  }
}

export default JsonDataDisplay;
