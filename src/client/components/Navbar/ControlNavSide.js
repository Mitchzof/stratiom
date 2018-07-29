import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ControlNavSide extends Component {
  componentDidMount() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
  }

  render() {
    return (
      <ul id="slide-out" className="sidenav sidenav-fixed cp-sidenav">
        <li><Link to="/wallet">Overview</Link></li>
      </ul>
    );
  }
}

export default ControlNavSide;
