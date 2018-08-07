import React, { Component } from 'react';
import TrustlineModalRow from './TrustlineModalRow';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    account: state.user.account,
    privkey: state.user.privkey
  }
}

/*
  Modal for PathManager component.  Loads trustlines for selection,
  then opens OfferModal.
*/
class CreateOfferModal extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      target: ''
    }
  }

  componentDidMount() {
    let elem = document.getElementById('offermodal');
    M.Modal.init(elem);
    this.instance = M.Modal.getInstance(elem);
  }

  handleSelect() {
    this.instance.open();
  }

  select(accountId) {
    this.props.target(accountId);
    this.setState({ target: accountId });
  }

  render() {
    let rows = [];
    this.props.account.balances.forEach(asset => {
      if (asset.asset_code == 'STRTMUSD') {
        rows.push(<TrustlineModalRow key={ asset.asset_issuer } select={ this.select } accountId={ asset.asset_issuer } target={ this.state.target } />);
      }
    });

    return (
      <div id="trustlinemodal" className="modal modal-fixed-footer">
        <div className="modal-content" style={{ display: 'inline-block', wordBreak: 'break-word' }}>
          <h5>Select Trustline</h5>
          { rows }
        </div>
        <div className="modal-footer">
          <button className={
            (this.state.target) ? "modal-close btn waves-effect waves-light btn-primary" : "btn disabled"
          } onClick={ this.handleSelect }>Select</button>
          <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(CreateOfferModal);
