import React,{ useState, useEffect, Component, MouseEvent } from 'react';
import Progress_bar from './progressBar';

function About(){
    return(
      <body>
        <div>About</div>
        <Progress_bar bgcolor="orange" progress='30'  height={30} />
      </body>
    )
  }

export default About;