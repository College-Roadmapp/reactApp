import { FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { Component, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';


class Course {
  constructor(id, name, credits, term) {
    this.id = id;
    this.name = name;
    this.credits = credits;
    this.term = term;
    this.completed = 0;
  }
  log() {
    console.log(this.id, this.name, this.credits, this.term, this.term);
  }
  completeCourse(){
    this.completed = 1;
  }
}



class Degree {
  constructor(){
    this.degree = [];
  }
  insertCourse(id, name, credits, term){
    let c = new Course(id, name, credits, term);
    this.degree.push(c);
  }
  removeCourse(courseID){
    this.degree = this.degree.filter(function(i) {return i.id != courseID; });
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

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const allTerms = [1,2,3,4,5,6,7,8,9,10,11,12]
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
              {allTerms.map((term) => <MenuItem value={term}>{term}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}


class Table {
  constructor(objectArray){
    this.array = objectArray;
    this.size = objectArray.numberCourses;
  }
  getHtml(termNum){

    var htmlElements = '';

    var temp= [];
    var result = this.array;

    for(let i=0; i < this.size; i++){
      if(this.array.getTerm(i) === termNum){
        temp.push(this.array.getCourse(i));
      }
    }
    temp=temp.map(
        (info, i)=>{
            return(
                <tr>
                    <td>
                      <Checkbox/>
                    </td>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.credits}</td>
                    <td>{info.term}</td>
                    <td>
                      <BasicModal/>
                    </td>
                </tr>
            )
        }
    );

    return(
        <div>
            <table className="table table-striped">
              <caption> Term {termNum} </caption>
                <thead>
                    <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Term</th>
                    </tr>
                </thead>
                <tbody>
                    {temp}
                </tbody>
            </table>
        </div>

    )



    //return TermTable(this.array, tableIndex);

  }
}

function IntoClassObjects(){
  const parsedJSON = require('./computerScience.json');
  var result = parsedJSON.computerScience;

  let newDegree = new Degree();

  for(let i=0; i < result.length; i++){
    newDegree.insertCourse(result[i].id, result[i].name, result[i].credits, result[i].term);

  }
  return newDegree;
}


function JsonDataDisplay(){
  const parsedJSON = require('./computerScience.json');
  var result = parsedJSON.computerScience;

  let newDegree = IntoClassObjects();
  let newTable1 = new Table(newDegree);
  // let newTable2 = new Table(newDegree);
  // let newTable3 = new Table(newDegree);
  // let newTable4 = new Table(newDegree);
  // let newTable5 = new Table(newDegree);
  // let newTable6 = new Table(newDegree);


  let var1 = (
    <div className="Tables">
        <div className="classTable">
        {newTable1.getHtml(1)}
        </div>
        <div className="classTable">
        {newTable1.getHtml(2)}
        </div>
        <div className="classTable">
        {newTable1.getHtml(3)}
        </div>
        <div className="classTable">
        {newTable1.getHtml(4)}
        </div>
        <div className="classTable">
        {newTable1.getHtml(5)}
        </div>
        <div className="classTable">
        {newTable1.getHtml(6)}
        </div>
    </div>
  )
  return var1
}


export default JsonDataDisplay;
