import React, { Component } from 'react';
import { deleteTrustline } from './helpers/stellarHelper.js';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete(e) {
    deleteTrustline(this.props.privkey, this.props.target)
  }

  render() {
    return (
      <div id="deletemodal" className="modal">
        <div className="modal-content">
          <h6><b>Delete Stratiom Trustline For AccountID: </b></h6>
          <div className="issuer-text">{ this.props.target }</div>
          <p>Are you sure you would like to delete this trustline?</p>
          <p><b>Note:</b> Trustlines cannot be deleted while you hold an asset.
          If you are holding an asset from this trustline, it means you are either directly or indirectly
          participating in a payment path/debt, and must wait until the debt has cleared.</p>
        </div>
        <div className="modal-footer">
          <a onClick={ this.delete } className="modal-close waves-effect btn">Delete</a>
        </div>
      </div>
    );
  }
}

export default Loader;
