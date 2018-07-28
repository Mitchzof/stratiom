import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ControlNavTop extends Component {

  render() {
    return (
      <nav>
        <div className="nav-wrapper cp-nav">
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <Link to="/"><div className="brand-logo logo-container" style={{color: '#505558'}}>Stratiom</div></Link>
        </div>
      </nav>
    );
  }
}

export default ControlNavTop;
