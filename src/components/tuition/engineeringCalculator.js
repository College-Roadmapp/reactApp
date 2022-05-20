import React from 'react';


function EngineeringCalculator(){
  //const num1 = parseInt(prompt('Enter the first number '));


  const getInputValue = (event)=>{
          // show the user input value to console
          const userValue = event.target.value;

          console.log(userValue);
          console.log("num credits: ");


          var tuitionNum = parseInt(userValue);

          //tuitionNum = this.state.getTotalCredits();
          //console.log("num credits: ");

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

      <h6> Tuition Calculator*: </h6>
      <p className="tuitionText"> Enter credits: <input type="text" onChange={getInputValue} /> </p>
      <div className="tuitionText">
        <Checkbox
        label = "Out-of-state"
        value = {checked}
        onChange = {boxChecked}
        />
      </div>

      <div className = "tuitionAmount">
        <p className="tuitionText"> $ </p>
        <p className="tuitionText" id="tuitionTotal"> 0</p>
      </div>

      <p className="tuitionText"> *This is an estimatation of tuition prices and does not include additional fees. For exact rates and more information, follow this <a href="https://fa.oregonstate.edu/business-affairs/tuition-and-fee-information"> link. </a></p>
    </div>


  )
}


export default EngineeringCalculator;
