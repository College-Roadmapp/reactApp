import React from 'react';


function EngineeringCalculator(){
  //const num1 = parseInt(prompt('Enter the first number '));
  const getInputValue = (event)=>{
          // show the user input value to console
          const userValue = event.target.value;

          console.log(userValue);

          var tuitionNum = parseInt(userValue);
          tuitionNum*=303;

          document.getElementById("tuitionTotal").innerHTML = ('$' + tuitionNum);
      };


  return(

    <div className="tuitionTable">

    <h3> Tuition Calculator: </h3>
    <p> Enter credits: <input type="text" onChange={getInputValue} /> </p>
    <p> *(checkbox for selecting out of state tuition costs)</p>

    <p id="tuitionTotal"> 0</p>


    </div>


  )
}

export default EngineeringCalculator;
