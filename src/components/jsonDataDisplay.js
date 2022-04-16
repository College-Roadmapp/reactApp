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
  constructor(id, name, credits, term) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.term = term;
    this.completed = 0;
  }
}

// ------------------ degree --------------------
class Degree {
  constructor(){
    this.degree = [];
  }
  insertCourse(id, name, credits, term){
    let c = new Course(id, name, credits, term);
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
      previousTest: null
    };

    this.BasicModal = this.BasicModal.bind(this);
  }
  
  BasicModal(props) {
    // handling modal open
    const handleOpen = () => {
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
      props.info.array.insertCourse(props.info.array.getId(idx), props.info.array.getName(idx), props.info.array.getCredits(idx), this.state.term);
      props.info.array.removeCourse(idx);
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
    const parsedJSON = require('./computerScience.json');
    var result = parsedJSON.computerScience;
    //create new degree plan to put the json in
    let newDegree = new Degree();
    //loop through each course found in the json file and add it to the Degree Class component
    for(let i=0; i < result.length; i++){
      newDegree.insertCourse(result[i].id, result[i].name, result[i].credits);
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