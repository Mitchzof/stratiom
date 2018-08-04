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
        <li><Link to="/wallet">
          <i className="material-icons sidenav-icon">home</i>Overview
        </Link></li>
        <li><Link to="/wallet/pay">
          <i className="material-icons sidenav-icon">send</i>Send Funds
        </Link></li>
        <li><Link to="/wallet/txhistory">
          <i className="material-icons sidenav-icon">history</i>Transaction History
        </Link></li>
        <li><Link to="/wallet/trustline">
          <i className="material-icons sidenav-icon">library_add</i>Add Trust
        </Link></li>
        <li><Link to="/wallet/trustlines">
          <i className="material-icons sidenav-icon">portrait</i>Manage Trust
        </Link></li>
      </ul>
    );
  }
}

export default ControlNavSide;
