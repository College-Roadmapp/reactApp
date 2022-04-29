import React from 'react';
import Header from './header';
import cadenPic from './images/caden.jpg';
import isabellePic from './images/isabelle.jpg';
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
            <img src={userPic} className="profilePics" alt="portrait" />
            <div>
              <h3 className="center">Trey Husko</h3>
              <p className="profileText">Computer Science</p>
              <p className="profileText">LinkedIn</p>
            </div>
          </div>



          <div className="teammateProfiles">
            <img src={userPic} className="profilePics" alt="portrait" />
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
          <p>[description of how this project started]</p>
        </div>

      </body>
    )
  }

export default About;
