import React, { Component } from 'react';

class MidContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mid-container">
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s6 offset-s5">
                <h4>How To Use Stratiom</h4>
                <div className="col s12">
                  <div className="row">
                    <p>
                      To get started, click the "Account" link on the navbar.  All user data is
                      stored locally, and erased on refresh.  This means that Stratiom never sees
                      your private keys or sensitive data.
                    </p>
                    <p>
                      Using <b>Stratiom</b> is similar to using a normal Stellar wallet.
                      The difference is that <b>Stratiom</b> primarily facilitates peer-to-peer asset
                      transactions, without the use of anchors.  These assets are natively tied to USD, though ultimately
                      act as a persistant IOU stored on the Stellar network.
                    </p>
                    <p>
                      Once you have logged in for the first time, you will be prompted to complete a brief tutorial that gives
                      an overview of the basic features and procedures that <b>Stratiom</b> offers.
                    </p>
                    {
                      (TESTNET) ? '' : <p>Looking to test Stratiom?  Click <a href="https://testnet.stratiom.io">here</a> to use the testnet.</p>
                    }
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

export default MidContainer;
