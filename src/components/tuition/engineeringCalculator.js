import React from 'react';




function EngineeringCalculator(){
  //const num1 = parseInt(prompt('Enter the first number '));


  const getInputValue = (event)=>{
          // show the user input value to console
          const userValue = event.target.value;

          console.log(userValue);

          var tuitionNum = parseInt(userValue);
          if(!checked){
            tuitionNum*=303;
          }else{
            tuitionNum*=800;
          }

          document.getElementById("tuitionTotal").innerHTML = (tuitionNum);
      };

      const [checked, setChecked] = React.useState(false);
      const boxChecked = (event)=>{
              setChecked(!checked);

              var tuitionNum = document.getElementById("tuitionTotal").innerHTML;


              if(!checked){
                tuitionNum/=303;
                tuitionNum*=800;
              }else{
                tuitionNum/=800;
                tuitionNum*=303;
              }

              document.getElementById("tuitionTotal").innerHTML = (tuitionNum);
          };

          const Checkbox = ({ label, value, onChange }) => {
                  return (
                  <label>
                    <input type="checkbox" checked={value} onChange={boxChecked} />
                    {label}
                  </label>
                )
          };


  return(

    <div className="tuitionTable">

    <h3> Tuition Calculator*: </h3>
    <p> Enter credits: <input type="text" onChange={getInputValue} /> </p>
    <Checkbox
    label = "Out-of-state"
    value = {checked}
    onChange = {boxChecked}
    />

    <div className = "tuitionAmount">
      <p> $ </p>
      <p id="tuitionTotal"> 0</p>
    </div>

    <p> *This is an estimate of your college’s tuition prices and does not include additional fees. For exact rates and additional info, follow this <a href="https://fa.oregonstate.edu/business-affairs/tuition-and-fee-information"> link. </a></p>


    </div>


  )
}


export default EngineeringCalculator;
