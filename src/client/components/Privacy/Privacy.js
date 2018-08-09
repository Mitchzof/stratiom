import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

//Credit to Iris Li and StellarTerm

class Privacy extends Component {

  render() {
    return (
      <div>
        <Navbar fixed={ true } />
        <div className="col s12">
          <div className="row offset-nav">
            <div className="col s12">
              <div className="page-container">
                <div className="row content-header">
                  <h6>Privacy Policy</h6>
                </div>
                <div className="row content">
                  <div className="col s12">
                    <div className="row">
                      <p>
                        This policy may be updated or revised without notice. It
                        is the responsibility of the user to stay
                        informed about privacy policy changes.
                      </p>
                      <p>
                        Stratiom will store data locally to track initial visit.  The website does not contain
                        analytics scripts, nor does it store cookies.  Stratiom developers are not
                        able to view your private key.
                      </p>
                      <p>
                        However, Stratiom is hosted on GitHub, AWS, and Cloudflare infrastructure.
                        They may and do have their own tracking systems on their
                        servers. Those services have their own privacy policies and
                        they are not covered by this privacy policy.
                      </p>
                      <p>
                        While Stratiom does not track you, this does not mean your actions are private.
                        Take note of other privacy issues that may affect you:
                      </p>
                      <ul style={{ listStyleType: 'disc' }}>
                        <li>1. Your computer or electronic devices may be compromised</li>
                        <li>2. The Stratiom website may be compromised</li>
                        <li>3. Stellar is a public ledger. Anyone can see anything that happens on the network.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Privacy;
