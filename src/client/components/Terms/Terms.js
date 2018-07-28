import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

//Credit to Iris Li and StellarTerm

class Terms extends Component {

  render() {
    return (
      <div>
        <Navbar fixed={ true } />
        <div className="col s12">
          <div className="row offset-nav">
            <div className="col s12">
              <div className="page-container">
                <div className="row content-header">
                  <h4>Terms and Conditions</h4>
                </div>
                <div className="row content">
                  <div className="col s12">
                    <div className="row">
                      <h5>1. Cryptocurrency Risks</h5>
                      <p>
                        Cryptocurrency assets are subject to high market risks and volatility.
                        Past performance is not indicative of future results. Investments in blockchain
                        assets may result in loss of part or all of your investment. You are solely
                        responsible for your actions on the Stellar network.
                        Stratiom is not responsible for any losses incurred while using the Stellar network.
                      </p>
                    </div>
                    <div className="row">
                      <h5>2. Stellar Network Usage</h5>
                      <p>
                        Stratiom is only a user interface to Stellar and does not operate the
                        Stellar network. Stratiom is unable to control the actions
                        of others on the Stellar network. When using Stratiom, you are directly
                        communicating with the Horizon Stellar API operated by
                        Stellar Development Foundation. Transactions on
                        the Stellar network are irreversible. By using Stratiom, you assume responsibility
                        for your actions on the Stellar network.
                      </p>
                    </div>
                    <div className="row">
                      <h5>3. Privacy</h5>
                      <p>
                        Your privacy is important to us.
                        Please read the <Link to='/privacy'>privacy policy</Link> for more information.
                      </p>
                    </div>
                    <div className="row">
                      <h5>4. Endorsement</h5>
                      <p>
                        Stratiom does not endorse the usage of the Stellar network, nor does it endorse
                        any assets on the Stellar network.  Stratiom is exclusively an interface
                        for the network, agnostic of the network and its content.
                      </p>
                    </div>
                    <div className="row">
                      <h5>5. Usage Responsibilities</h5>
                      <p>
                        All responsibilities during usage of
                        Stratiom are accepted by the user and solely the user.
                        You, the user, are solely responsible for ensuring your
                        own compliance with laws and taxes in your jurisdiction.
                        Cryptocurrencies may be illegal in your area. You, are
                        solely responsible for your own security including keeping
                        your account secret keys safe and backed up.
                      </p>
                    </div>
                    <div className="row">
                      <h5>6. Disclaimer of Warranty</h5>
                      <p>
                        Stratiom is open source software
                        licensed under the Apache-2.0 license. It is provided
                        free of charge and on an "as is" basis, without warranties
                        or conditions of any kind.
                      </p>
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

export default Terms;
