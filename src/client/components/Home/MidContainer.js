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
                      Once you have logged in, <b>Stratiom</b> functions similarly to a normal wallet.
                      The difference is that <b>Stratiom</b> primarily facilitates peer-to-peer asset/debt
                      transactions, without anchors.  The value of these assets is
                      entirely defined by trust between you, and your transaction partner.
                    </p>
                    <p>
                      We encourage debts be settled via the native Stellar currency, Lumens,
                      to insure an easier transaction flow.  However, debts can be settled for fiat
                      currency as well.
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
