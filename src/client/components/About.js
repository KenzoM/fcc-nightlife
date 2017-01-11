import React, { Component } from 'react'

class About extends Component {
  render(){
    return(
      <div className="title">
        <h1>About the Nightlife Coordination App</h1>
        <h3>
          A <a href="https://www.freecodecamp.com/challenges/build-a-nightlife-coordination-app">Free Code Camp Project</a>&nbsp;
          that utilizes single-page React/Redux app with Node/Express on the back end.
          <br />
          <br />
          <a href="https://github.com/Neotriz/fcc-nightlife">View Source Code on GitHub</a>
          <br />
          <br />
          <a href="http://kenzomendoza.com/">Home Portfolio</a>
        </h3>

      </div>
    )
  }
}

export default About
