import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import Loader from '../Misc/Loader';

const mapStateToProps = state => {
  return {
    account: state.user.account
  }
}

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.payments = [];
    this.loadPayments = this.loadPayments.bind(this);
    this.loadMemos = this.loadMemos.bind(this);
    this.initialize = this.initialize.bind(this);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.initialize();
  }

  initialize() {
    this.props.account.payments({ order: "desc", limit: 100 }).then(payments => {
      this.loadPayments(payments);
    }).catch(e => {
      setTimeout(this.initialize, 1500);
    });
  }

  loadPayments(payments) {
    if (payments.records.length > 0) {
      this.payments = this.payments.concat(payments.records);
      payments.next().then(payments => {
        this.loadPayments(payments);
      })
    } else {
      this.loadMemos();
    }
  }

  loadMemos() {
    this.payments.forEach(tx => {
      this.counter++;
      if ((tx.type == 'payment' || tx.type == 'path_payment') && tx.asset_code == 'STRTMUSD') {
        tx.transaction().then(data => {
          if (data.memo) {
            tx.memo = data.memo;
            if (this.mounted) {
              this.forceUpdate();
            }
          }
        });
      }
      if (this.counter == this.payments.length && this.mounted) {
        this.setState({ loading: false });
        let info = document.getElementById('info');
        M.Modal.init(info);
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let rows = [];
    var count = 0;

    this.payments.forEach(tx => {
      if ((tx.type == 'payment' || tx.type == 'path_payment') && tx.asset_code == 'STRTMUSD') {
        if (tx.from == this.props.account.account_id) {
          if (tx.asset_issuer == tx.to) {
            tx.isRefund = true;
          }
          tx.direction = 'out';
        } else {
          if (tx.asset_issuer == this.props.account.account_id) {
            tx.isRefund = true;
          }
          tx.direction = 'in';
        }

        rows.push(<Transaction key={ tx.id } tx={ tx } index={ count } />);
        count++;
      }
    });

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
        <div className="panel-container small">
          <div className="panel-header" style={{ display: 'flex', 'justifyContent': 'space-between' }}>
            <h6>
              Payment History
            </h6>
            <a href="#info" className="modal-trigger info"><i className="material-icons">info_outline</i></a>
          </div>
          <div className="transaction-container">
            {
              (rows.length > 0) ?
              <div className="tx" style={{ borderTop: '0px' }}>
                <div style={{width: '10%'}}></div>
                <div style={{width: '20%'}}><p>Amount</p></div>
                <div style={{width: '20%'}}><p>Payment Type</p></div>
                <div style={{width: '20%'}}><p>Account</p></div>
                <div style={{width: '20%'}}><p>Date</p></div>
              </div> :
              <div></div>
            }
            {
              (rows.length > 0) ?
              rows :
              <div className="row center-align" style={{ height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: '17px', marginBottom: '30px', marginTop: '30px' }}>
                  You have not yet made any transactions through Stratiom
                </p>
              </div>
            }
          </div>
        </div>
        <div id="info" className="modal">
          <div className="modal-content">
            <p>This component displays the history of your payments to and from other users.</p>
            <p>Note that this component does not display path participation, nor does it display XLM settlement
            history as these are considered different modes of payment.  It
            exclusively displays direct or path payments made through the Stratiom UI.</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-dark btn-flat">Close</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(TransactionHistory);
