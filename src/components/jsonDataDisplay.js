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


let totalProgress = 0;
let totalCoursesTaken = [];
// ------------------ class --------------------
class Course {
  constructor(id, name, credits, term) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.term = 0;
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
  removeCourse(courseID){
    this.degree = this.degree.filter(function(i) {return i.id !== courseID; });
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
}


// ------------------ checkbox --------------------
function ControlledCheckbox(props) {
  const [checked, setChecked] = React.useState(false);

  //setting 'completed' to 1 for corresponding course if box is checked
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(event.target.checked === true){
      props.deg.getCourse(props.idx).completed = 1;
      //adding the course to the array of all courses completed by user
      if(!totalCoursesTaken.includes(props.deg.getCourse(props.idx).id)){
        totalCoursesTaken.push(props.deg.getCourse(props.idx).id);
        //adding the credits out of the pool of total credits completed
        totalProgress += props.deg.getCourse(props.idx).credits;
      }
    }
    else if(event.target.checked === false){
      props.deg.getCourse(props.idx).completed = 0;
      //remove the course from the array of all courses completed by user
      if(totalCoursesTaken.includes(props.deg.getCourse(props.idx).id)){
        var idx = totalCoursesTaken.indexOf(props.deg.getCourse(props.idx).id)
        totalCoursesTaken.splice(idx, 1);
        //taking the credits out of the pool of total credits completed
        totalProgress -= props.deg.getCourse(props.idx).credits;
      }
    }
    console.log(totalCoursesTaken);
    console.log(totalProgress);
    //********  this is where we will want to update progress bar and mark a course as completed ******
  };
  return (
    <td>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </td>
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


// ------------------ modal --------------------
function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.deg.getCourse(props.idx).term = term;
    // let newTable = new Table(props.deg);
    // return(
    //   <MakeTables info={newTable} />
    // )
    // console.log(newTable)
    // MakeTables(newTable);
  }

  const allTermNums = [1,2,3,4,5,6,7,8,9,10,11,12]
  // const [term, setTerm] = React.useState(props.deg.getCourse(props.idx).term)
  const [term, setTerm] = React.useState(0)

  const handleTermChange = event => {
    setTerm(event.target.value);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Change Term</Button>
      <Modal
        open={open}
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
            value={term}
            label="Term"
            onChange={handleTermChange}
            >
              {allTermNums.map((term) => <MenuItem value={term}>{term}</MenuItem>)}
            </Select>
          </FormControl>
          <Button onClick={handleClose}>OK</Button>
        </Box>
      </Modal>
    </div>
  );
}

// ------------------ roadmap --------------------
class Table  extends React.Component{

  constructor(props){
    super(props);
    this.array = props;
    this.size = props.numberCourses;
  }

  getHtml(termNum){
    var temp= [];

    //setting temp array of courses based on term number of course components and termNum
      //assigns values for each element from degree plan that is calling the function
    for(let i=0; i < this.size; i++){
      if(this.array.getTerm(i) === termNum){
        temp.push(this.array.getCourse(i));
      }
    }
    
    //creating html for each element of temp using json data
    temp=temp.map(
        (info, i)=>{
            return(
                <tr>
                    <td>
                      <ControlledCheckbox id={info.id} deg={this.array} idx={(termNum-1)*4 + i}/>
                    </td>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.credits}</td>
                    <td>
                      <BasicModal id={info.id} deg={this.array} idx={(termNum-1)*4 + i}/>
                    </td>
                </tr>
            );
        }
    );
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


// ------------------ parse json --------------------
function IntoClassObjects(){
  //******* this will have to be conditional based on dropdown selection *****
  const parsedJSON = require('./computerScience.json');
  var result = parsedJSON.computerScience;

  let newDegree = new Degree();

  for(let i=0; i < result.length; i++){
    newDegree.insertCourse(result[i].id, result[i].name, result[i].credits);
  }
  return newDegree;
}



// ------------------ assigning intitial term for each course --------------------
function assignTerms(){
// function JsonDataDisplay(){
  let newDegree = IntoClassObjects();
  let newTable1 = new Table(newDegree);

  let termNum = 1;
  //assigns term values; 4 classes per term based on order they appear in json
  for(let i=0; i < newTable1.size; i++){
    //setting each course's term number based on which term we are rendering it
    newTable1.props.getCourse(i).term = termNum
    //increments the term number after 4 classes have been added
    if((i + 1) % 4 === 0){
      termNum += 1
    }
  }
  return newTable1;
}


// ------------------ display tables and json based on props --------------------
function MakeTables(props){
  //creates 12 term tables and fills them in with available data
  return (
    <div className="Tables">
        <div className="classTable">
        {props.info.getHtml(1)}
        </div>
        <div className="classTable">
        {props.info.getHtml(2)}
        </div>
        <div className="classTable">
        {props.info.getHtml(3)}
        </div>
        <div className="classTable">
        {props.info.getHtml(4)}
        </div>
        <div className="classTable">
        {props.info.getHtml(5)}
        </div>
        <div className="classTable">
        {props.info.getHtml(6)}
        </div>
        <div className="classTable">
        {props.info.getHtml(7)}
        </div>
        <div className="classTable">
        {props.info.getHtml(8)}
        </div>
        <div className="classTable">
        {props.info.getHtml(9)}
        </div>
        <div className="classTable">
        {props.info.getHtml(10)}
        </div>
        <div className="classTable">
        {props.info.getHtml(11)}
        </div>
        <div className="classTable">
        {props.info.getHtml(12)}
        </div>
    </div>
  )
}


// ------------------ creates initial roadmap --------------------
function JsonDataDisplay(){
  //brand new json
  let info = assignTerms();
  return(
    <div>
      <MakeTables info={info}/>
    </div>
  )
}

export default JsonDataDisplay;
