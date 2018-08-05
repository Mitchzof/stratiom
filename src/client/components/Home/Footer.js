import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{backgroundColor: 'rgb(242, 246, 249)', width: '100%'}}>
      <div className="footer">
        <div style={{ maxWidth: '75%' }}>
          <p>
            Developed by Mitchell Chase
          </p>
        </div>
        <div className="footer-link-container">
          <Link to="/terms"><u>Terms and Conditions</u></Link>
          <Link to="/privacy"><u>Privacy Policy</u></Link>
        </div>
        <div className="footer-link-container">
          <a href="https://github.com/Mitchzof/stratiom"><i className="small material-icons">code</i></a>
        </div>
      </div>
      </div>
    );
  }
}

export default Footer;
