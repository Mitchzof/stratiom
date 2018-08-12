import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ControlNavTop extends Component {

  render() {
    return (
      <nav style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,.14), 0 2px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2)' }}>
        <div className="nav-wrapper cp-nav">
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <Link to="/"><div className="brand-logo logo-container" style={{color: '#505558'}}>Stratiom</div></Link>
          <ul id="nav-mobile" className="right" style={{marginRight: '4%'}}>
            <li><a href="/">
              <i className="material-icons nav-icon">power_settings_new</i>
            </a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default ControlNavTop;
