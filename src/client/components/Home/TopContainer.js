import React, { Component } from 'react';

class TopContainer extends Component {
  render() {
    return (
      <div className="top-container">
        <div className="content">
          <div className="row">
            <div className="col s12">
              <div className="row">
                <h4>What Is Stratiom?</h4>
                <div className="col s7">
                  <div className="row">
                    <p>
                      <b>Stratiom</b> is an open-source, peer-to-peer, web-based wallet for the Stellar Network.
                    </p>
                    <p>
                      The platform is a user interface that interacts with the Stellar
                      network, making it easy to send small payments to friends and family, without the need for anchors.
                    </p>
                    <p>
                      <b>Stratiom</b> aims to simplify and popularize peer-to-peer
                      payments in the Stellar ecosystem, while offering these features in an easy to use, secure manner.
                      None of your data is stored on our servers, as Stratiom is purely an interface for interaction with the Stellar network.
                    </p>
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

export default TopContainer;
