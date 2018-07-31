import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ControlNavSide extends Component {
  componentDidMount() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
  }

  render() {
    return (
      <ul id="slide-out" className="sidenav sidenav-fixed cp-sidenav">
        <div className="info-block">
          Wallet
        </div>
        <li><Link to="/wallet">Overview</Link></li>
        <li><Link to="/wallet/trustline">Add Trust</Link></li>
        <li><Link to="/wallet/trustlines">Manage Trust</Link></li>
        <li><Link to="/wallet/pay">Send Funds</Link></li>
      </ul>
    );
  }
}

export default ControlNavSide;
