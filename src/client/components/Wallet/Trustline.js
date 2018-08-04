import React, { Component } from 'react';

class Trustline extends Component {
  constructor(props) {
    super(props);
    this.deleteTrustline = this.deleteTrustline.bind(this);
  }

  deleteTrustline() {
    this.props.deleteAction(this.props.trustline.issuer);
  }

  render() {
    return (
      <div className="trustline" id={ this.props.trustline.issuer }>
        <div className="issuer">
        <b>Account ID: </b>{ this.props.trustline.issuer.slice(0, 16) }...
        { this.props.trustline.issuer.slice(this.props.trustline.issuer.length - 16, this.props.trustline.issuer.length) }
        <div className="button-box">
          <a onClick={ this.deleteTrustline } style={{color: 'red'}}><i className="tiny material-icons">close</i></a>
        </div>
        </div>
        <div className="balance">${ this.props.trustline.balance.slice(0, this.props.trustline.balance.length - 5) }</div>
      </div>
    );
  }
}

export default Trustline;
