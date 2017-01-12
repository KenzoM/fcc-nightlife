import React, { Component } from 'react';

export default class Markers extends Component {
  render() {
    const { name} = this.props
    return (
       <div className="tooltip">
         <span className="tooltip-text">
          {name}
         </span>
       </div>
    );
  }
}
