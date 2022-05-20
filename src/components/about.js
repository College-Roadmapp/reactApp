import React from 'react';
import Header from './header';
import cadenPic from './images/caden.jpg';
import isabellePic from './images/isabelle.jpg';
import weixianPic from './images/weixian.png';
import treyPic from './images/trey.png';
import userPic from './images/userIcon.png'
import { Link } from "react-router-dom";

function About(){
    return(
      <body>
        {Header()}

        <div className="profiles">
          <div className="teammateProfiles">
            <img src={isabellePic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Isabelle Bretl</h3>
              <p className="profileText">Computer Science, Cybersecurity</p>
              <a className="profileText" href="https://www.linkedin.com/in/isabelle-bretl-525456173/">LinkedIn</a>
            </div>
          </div>

          <div className="teammateProfiles">
            <img src={treyPic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Trey Husko</h3>
              <p className="profileText">Computer Science</p>
              <a className="profileText" href="https://www.linkedin.com/in/trey-husko-th1">LinkedIn</a>
            </div>
          </div>

          <div className="teammateProfiles">
            <img src={cadenPic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Caden Verzino</h3>
              <p className="profileText">Computer Science, Systems</p>
              <a className="profileText" href="https://www.linkedin.com/in/caden-verzino-167449174/">LinkedIn</a>
            </div>
          </div>

          <div className="teammateProfiles">
            <img src={weixianPic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Weixian Yi</h3>
              <p className="profileText">Computer Science, AI</p>
              <a className="profileText" href="https://www.linkedin.com/in/weixian-yi-38aa911ab">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className = "teamDesciption">
          <p className = "teamDescText">MyOSURoadmap is a product of Oregon State University's Capstone Senior Projects program. We are a team of senior computer science undergraduates who came together to work on this year-long project to develop a tool that can benefit both present and future students of the OSU community. Our application was built throughout the 2021-2022 school year in partnership with OSU project instructor, <a href="https://eecs.oregonstate.edu/people/scheel-ingrid">Ingrid Scheel</a>, who introduced the project idea and the goals we’ve worked to achieve. The main goal of this app is to allow students to easily understand the complex course map to get to graduation and guide them through searching for a major that best aligns with their interests. This is a problem that our team members had individually faced as students, which is common among most others. The website we’ve implemented here is the final product from all of our design work, data collection, and front-end web development with React. At the conclusion of this project, we had created a resource for students to overcome multiple roadblocks for planning out their academic career at OSU. Our team’s vision is that this tool will help many OSU students and has the potential to be expanded into something greater on a university-wide level. We hope this project will be further developed in the future of this program to improve the application’s utility and ability to support students after us. </p>
        </div>

      </body>
    )
  }

export default About;
