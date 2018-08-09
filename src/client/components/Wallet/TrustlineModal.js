import React, { Component } from 'react';
import TrustlineModalRow from './TrustlineModalRow';

/* Trustline selection to fill fields */
class TrustlineModal extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      target: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fill(this.state.target);
  }

  select(accountId) {
    this.setState({ target: accountId });
  }

  render() {
    let rows = [];
    this.props.balances.forEach(asset => {
      if (asset.asset_code == 'STRTMUSD') {
        rows.push(<TrustlineModalRow key={ asset.asset_issuer } select={ this.select } accountId={ asset.asset_issuer } target={ this.state.target } />);
      }
    })

    return (
      <div id="trustlinemodal" className="modal modal-fixed-footer">
        <div className="modal-content" style={{ display: 'inline-block', wordBreak: 'break-word' }}>
          <h6>Select Trustline</h6>
          { rows }
        </div>
        <div className="modal-footer">
          <button className={
            (this.state.target) ? "modal-close btn waves-effect waves-light btn-primary" : "btn disabled"
          } onClick={ this.handleSubmit }>Select</button>
          <a className="modal-close waves-effect waves-green btn-flat" onClick={ this.handleClose }>Cancel</a>
        </div>
      </div>
    );
  }
}

export default TrustlineModal;
