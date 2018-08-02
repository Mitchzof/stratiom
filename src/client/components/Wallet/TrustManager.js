import React, { Component } from 'react';
import { loadAccount, deleteTrustline } from './helpers/stellarHelper';
import Loader from '../Misc/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAccount as loadAccountAC, setTrustlines } from '../../../store/actions';
import Trustline from './Trustline';

const mapStateToProps = state => {
  return {
    privkey: state.user.privkey,
    pubkey: state.user.pubkey,
    account: state.user.account,
    trustlines: state.user.trustlines
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadAccount: loadAccountAC,
  setTrustlines: setTrustlines
}, dispatch);

class TrustManager extends Component {
  constructor(props) {
    super(props);
    this.deleteAction = this.deleteAction.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      loading: false,
      target: ''
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  deleteAction(issuer) {
    this.setState({ target: issuer });
    let elem = document.getElementById('deletemodal');
    M.Modal.init(elem);
    let instance = M.Modal.getInstance(elem);
    instance.open();
  }

  delete() {
    if (this.state.target) {
      this.setState({ loading: true });

      deleteTrustline(this.props.privkey, this.state.target).then(res => {
        loadAccount(this.props.pubkey).then(acc => {
          this.props.loadAccount(acc);
        });
        if (this.mounted) {
          this.setState({ loading: false });
        }
        M.toast({ html: 'Success: Trustline has been deleted', classes: 'success-toast' });
      }).catch(e => {
        if (this.mounted) {
          this.setState({ loading: false });
        }
        M.toast({ html: 'Error Deleting Trustline: You likely still hold the asset', classes: 'error-toast' });
      });
    }
  }

  render() {
    let rows = []
    if (this.props.account) {

      this.props.account.balances.forEach(asset => {
        if (asset.asset_type != "native" && asset.asset_code == "STRTMUSD") {
          rows.push(<Trustline key={ asset.asset_issuer } trustline={{
              balance: asset.balance,
              issuer: asset.asset_issuer,
              asset: asset.asset_code
            }} deleteAction={ this.deleteAction } />);
        }
      });
    } else {
      rows = 'Oh no, you don\'t have any trustlines.  Go make some!';
    }

    if (this.state.loading) {
      return (
        <div className="cp-container">
          <div className="loader-container">
            <Loader />
          </div>
        </div>
      );
    }
    
    return (
      <div className="cp-container">
        <div className="panel-container">
          <div className="row panel-header">
            <h5>
              Stratiom Trustlines
            </h5>
          </div>
          <div className="row panel-content">
            <div className="trustline-container">
              { (rows.length > 0) ? rows :
                <div className="row center-align"><p style={{ fontSize: '17px' }}>
                  You do not currently have any Stratiom trustlines</p>
                </div>
              }
            </div>
          </div>
        </div>
        <div id="deletemodal" className="modal">
          <div className="modal-content">
            <h6><b>Delete Stratiom Trustline For AccountID: </b></h6>
            <div className="issuer-text">{ this.state.target }</div>
            <p>Are you sure you would like to delete this trustline?</p>
            <p><b>Note:</b> Trustlines cannot be deleted while you hold an asset.
            If you are holding an asset from this trustline, it means you are either directly or indirectly
            participating in a payment path/debt, and must wait until the debt has cleared.</p>
          </div>
          <div className="modal-footer">
            <a onClick={ this.delete } className="modal-close waves-effect btn">Delete</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrustManager);
