import React from 'react';


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
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.credits}</td>
                    <td>{info.term}</td>
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
  let newTable2 = new Table(newDegree);
  let newTable3 = new Table(newDegree);
  let newTable4 = new Table(newDegree);
  let newTable5 = new Table(newDegree);
  let newTable6 = new Table(newDegree);


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
