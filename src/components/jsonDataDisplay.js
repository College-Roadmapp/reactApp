import React from 'react';

function JsonDataDisplay(){
  const parsedJSON = require('./computerScience.json');
  var result = parsedJSON.computerScience;
  for(let i=0; i<3; i++){

  }
  let var1 = (
    <div className="Tables">
        <div className="classTable">
        {TermTable(result, 1)}
        </div>
        <div className="classTable">
        {TermTable(result, 2)}
        </div>
        <div className="classTable">
        {TermTable(result, 3)}
        </div>
        <div className="classTable">
        {TermTable(result, 4)}
        </div>
        <div className="classTable">
        {TermTable(result, 5)}
        </div>
        <div className="classTable">
        {TermTable(result, 6)}
        </div>
    </div>
  )
  return var1
}

function TermTable(result, term_no){
    const [classCheck, setClassCheck] = React.useState('');
    const handleChange = (event) => {
        setClassCheck(event.target.value)
    }
    var temp= [];

    for(let i=0; i < result.length; i++){
      if(result[i].term === term_no){
        temp.push(result[i]);
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
              <caption> Term {term_no} </caption>
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

}

export default JsonDataDisplay;
