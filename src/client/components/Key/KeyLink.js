import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class KeyLink extends Component {
  render() {
    return (
      <div style={{ width: '500px', textAlign: 'center', marginTop: '15px'}}>
        <Link to="/key">
          Don{'\''}t have a wallet?  Click here to generate a new keypair.
        </Link>
      </div>
    );
  }
}

export default KeyLink;
