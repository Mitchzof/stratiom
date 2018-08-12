import React, { Component } from 'react';

/*
  TODO: I'd really like to make a better tutorial.  If anyone would like to contribute
  to Stratiom, this would be an excellent place to help out.
*/
class Tutorial extends Component {
  complete() {
    localStorage.setItem('tutorial', true);
  }

  render() {
    return (
      <div id="tutorial" className="modal tutorial" style={{ height: '700px' }}>
        <div className="modal-content" style={{ padding: '0px 0px 0px 0px' }}>
          <div className="carousel carousel-slider center tutorial-carousel" id="tutorial-carousel">
            <div className="carousel-fixed-item center">
              <a onClick={ this.props.next } className="btn waves-effect white black-text darken-text-2">Next</a>
            </div>
            <div className="carousel-item tutorial-blue" href="#one!">
              <div className="row center-align">
                <h2>Tutorial</h2>
              </div>
              <div className="row">
                <p>
                  This will be a quick tutorial explaining the basics
                  of Stratiom.  This tutorial is important as Stratiom is a fairly complex
                  platform.  Don{'\''}t worry though, once the tutorial has been completed,
                  it will never show up again.
                </p>
              </div>
            </div>
            <div className="carousel-item tutorial-dark" href="#two!">
              <div className="row center-align">
                <h2>Trustlines</h2>
              </div>
              <div className="row">
                <p>
                  The first steps to getting started involve understanding how we utilize trustlines.
                  Without the use of anchors, each user individually issues a unique asset,
                  tied to their debt.  In order to receive a payment, you must have
                  a trustline created for the sender{'\''}s account ID.  This can be done
                  through the "Add Trust" page.
                </p>
              </div>
            </div>
            <div className="carousel-item tutorial-blue" href="#three!">
              <div className="row center-align">
                <h2>Payment Mediation</h2>
              </div>
              <div className="row">
                <p>
                  After creating a trustline, you will be prompted to place a passive order
                  mediating payments for the account you are trusting.  This creates an offer buying
                  their debt asset and selling your debt asset.  The Stellar network allows a special type of
                  payment called "path payments."
                </p>
                <p>
                  Path payments allow users to send funds to other users that are not directly trusted.  The
                  way this works is that a series of these passive offers are enacted upon, leading to a
                  chained debt asset exchange from sender to receiver.
                </p>
              </div>
            </div>
            <div className="carousel-item tutorial-dark" href="#four!">
              <div className="row center-align">
                <h2>Debt Assets</h2>
              </div>
              <div className="row">
                <p>
                  Since trustlines are created for each asset you would like to receive, Stratiom
                  has decided to simplify the payment process by creating a single asset per user, and
                  tethering that asset to USD.  This greatly simplifies the system by
                  offering the stability of fiat exchange rates, while
                  also optimizing the trustline and payment systems.
                </p>
              </div>
            </div>
            <div className="carousel-item tutorial-blue" href="#five!">
              <div className="row center-align">
                <h2>Sending Funds</h2>
              </div>
              <div className="row">
                <p>
                  Once you and another user have established trustlines,
                  you may proceed to make your first payment!  Simply go to the "Send Funds" page,
                  and select the user from your list of trustlines, or type the address manually.
                  Then enter the amount to send and an optional note.  After that, press send, and your
                  payment will be sent assuming there is a path of trust from you to the destination account.
                </p>
              </div>
            </div>
            <div className="carousel-item tutorial-dark" href="#six!">
              <div className="row center-align">
                <h2>XLM Linkage</h2>
              </div>
              <div className="row">
                <p>
                  The simplest and most efficient way of using Stratiom is by bridging your
                  debt asset to the native currency, Lumens, on the Stellar network. This
                  effectively offers a guaranteed rate for debt, while also offering instant
                  debt settlement.
                </p>
                <p>
                  Be careful though, this feature is incredibly dangerous if used improperly.
                  Make sure to read the warnings and understand the risks when linking your asset to
                  Lumens.
                </p>
              </div>
            </div>
            <div className="carousel-item tutorial-blue" href="#seven!">
              <div className="row center-align">
                <h2>Settling Debt</h2>
              </div>
              <div className="row">
                <p>
                  Since asset ownership on the network is really an IOU, debt can be settled
                  in one of two ways.  The first, as previously mentioned, is that debt can be settled
                  on the Stellar network for the native Lumens (XLM).
                </p>
                <p>
                  The second way debt can be settled is in real life, via fiat currency.  Once you are
                  paid in real life, simply return the debt asset to the initial sender via the "Payment Manager" on
                  the main page.
                </p>
              </div>
            </div>
            <div className="carousel-item tutorial-dark" href="#eight!">
              <div className="row center-align">
                <h2>All Done!</h2>
              </div>
              <div className="row">
                <p>
                  You are now ready to begin using Stratiom!  Explore the platform
                  and get a feel for the features.  Click below to close this tutorial.
                </p>
              </div>
              <div className="row center-align">
                <a onClick={ this.complete } className="modal-close btn waves-effect white-text">Complete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tutorial;
