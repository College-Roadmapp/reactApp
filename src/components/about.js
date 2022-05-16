import React from 'react';
import Header from './header';
import cadenPic from './images/caden.jpg';
import isabellePic from './images/isabelle.jpg';
import weixianPic from './images/weixian.png';
import treyPic from './images/trey.png';
import userPic from './images/userIcon.png'

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
              <p className="profileText">LinkedIn</p>
            </div>
          </div>

          <div className="teammateProfiles">
            <img src={treyPic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Trey Husko</h3>
              <p className="profileText">Computer Science</p>
              <p className="profileText">LinkedIn</p>
            </div>
          </div>

          <div className="teammateProfiles">
            <img src={weixianPic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Weixian Yi</h3>
              <p className="profileText">Computer Science</p>
              <p className="profileText">LinkedIn</p>
            </div>
          </div>

          <div className="teammateProfiles">
            <img src={cadenPic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Caden Verzino</h3>
              <p className="profileText">Computer Science, Systems</p>
              <p className="profileText">LinkedIn</p>
            </div>
          </div>
        </div>

        <div className = "teamDesciption">
          <p>MyOSURoadmap is a product of Oregon State's Capstone Senior Projects program. We are a team of senior computer science undergraduates who applied to work on this year-long project in partnership with OSU project instructor, Ingrid Scheel. (more about what we completed when finally done, where the project could go, technical info, goals, why we chose project)</p>
        </div>

      </body>
    )
  }

export default About;
