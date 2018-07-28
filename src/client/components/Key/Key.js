import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Keygen from './Keygen';
import Keypair from './Keypair';

class Key extends Component {
  constructor(props) {
    super(props);
    this.setKeypair = this.setKeypair.bind(this);
    this.state = {
      privkey: '',
      pubkey: ''
    }
  }

  setKeypair(privkey, pubkey) {
    this.setState({ privkey: privkey, pubkey, pubkey });
  }

  render() {
    return (
      <div>
        <Navbar fixed={ true } />
        <div className="container valign-wrapper" style={{ minHeight: '100vh' }}>
            <div className="row offset-nav">
              <div className="col">
                <Keygen submit={ this.setKeypair } />
                <Keypair privkey={ this.state.privkey } pubkey={ this.state.pubkey } />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Key;
