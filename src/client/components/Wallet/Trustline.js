import React, { Component } from 'react';

/*
  Trustline component for TrustManager
*/
class Trustline extends Component {
  constructor(props) {
    super(props);
    this.deleteTrustline = this.deleteTrustline.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  deleteTrustline() {
    this.props.deleteAction(this.props.trustline.issuer);
  }

  copyToClipboard() {
    var el = document.createElement('textarea');
    el.value = this.props.trustline.issuer;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    M.toast({ html: 'Copied to clipboard' });
  }

  render() {
    return (
      <div className="trustline" id={ this.props.trustline.issuer }>
        <div className="issuer">
        <b>Account ID: </b><div onClick={ this.copyToClipboard } className="selectable" style={{ height: '16px' }}>{ this.props.trustline.issuer.slice(0, 17) }...
        { this.props.trustline.issuer.slice(this.props.trustline.issuer.length - 17, this.props.trustline.issuer.length) }</div>
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
