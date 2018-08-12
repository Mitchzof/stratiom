import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ControlNavSide extends Component {
  componentDidMount() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
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
        <li><Link to="/wallet/trustline">
          <i className="material-icons sidenav-icon">library_add</i>Add Trust
        </Link></li>
        <li><Link to="/wallet/trustlines">
          <i className="material-icons sidenav-icon">portrait</i>Manage Trust
        </Link></li>
        <li><Link to="/wallet/paths">
          <i className="material-icons sidenav-icon">people</i>Payment Mediation
        </Link></li>
        <ul className="collapsible collapsible-accordion cp-active">
          <li>
            <a className="collapsible-header cp-link cp-active" style={{ padding: '0px 32px 0px 32px' }}><i className="material-icons sidenav-icon">history</i>Transaction History</a>
            <div className="collapsible-body" style={{ backgroundColor: '$bg-dark: #16263d' }}>
              <ul className="cp-dropdown">
                <li><Link to="/wallet/txhistory">Payments</Link></li>
                <li><Link to="/wallet/xlmhistory">XLM Settlements</Link></li>
              </ul>
            </div>
          </li>
        </ul>
      </ul>
    );
  }
}

export default ControlNavSide;
