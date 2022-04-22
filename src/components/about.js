import React from 'react';
import Header from './header';
import cadenPic from './images/caden.jpg';
import isabellePic from './images/isabelle.jpg';
import userPic from './images/userIcon.png'

function About(){
    return(
      <body>
        {Header()}

        <div className = "teamDesciption">
          <p>[description of how this project started]</p>
        </div>

        <div>
          <div className="teammateProfiles">
          <img src={isabellePic} className="profilePics" alt="portrait" />
            <div className="profileText">
              <p>Isabelle Bretl</p>
              <p>Computer Science, Cybersecurity</p>
            </div>
          </div>
        </div>

        <div>
          <div className="teammateProfiles">
          <img src={userPic} className="profilePics" alt="portrait" />
            <div className="profileText">
              <p>Trey Husko</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>

        <div>
          <div className="teammateProfiles">
          <img src={userPic} className="profilePics" alt="portrait" />
            <div className="profileText">
              <p>Weixian Yi</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>

        <div>
          <div className="teammateProfiles">
          <img src={cadenPic} className="profilePics" alt="portrait" />
            <div className="profileText">
              <p>Caden Verzino</p>
              <p>Computer Science, Systems</p>
            </div>
          </div>
        </div>

        <div>
          <div className="teammateProfiles">
          <img src={userPic} className="profilePics" alt="portrait" />
            <div className="profileText">
              <p>Robert Collines</p>
              <p>Computer Science</p>
            </div>
          </div>
        </div>

      </body>
    )
  }

export default About;
