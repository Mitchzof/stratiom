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
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.props.account.payments({ order: "desc", limit: 100 }).then(payments => {
      this.loadPayments(payments);
    }).catch(e => {
      setTimeout(this.forceUpdate, 1500);
    })
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
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let rows = [];

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

        rows.push(<Transaction key={ tx.id } tx={ tx } />);
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
        <div className="panel-container">
          <div className="panel-header">
            <h5>
              Transaction History
            </h5>
          </div>
          <div className="transaction-container">
            <div className="tx" style={{ borderTop: '0px' }}>
            <div style={{width: '10%'}}></div>
            <div style={{width: '20%'}}><p>Amount</p></div>
            <div style={{width: '20%'}}><p>Payment Type</p></div>
            <div style={{width: '20%'}}><p>Account</p></div>
            <div style={{width: '20%'}}><p>Date</p></div>
            </div>
            {
              (rows.length > 0) ? rows :
              <div className="row center-align"><p style={{ fontSize: '17px' }}>
                You have not yet made any transactions through Stratiom</p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(TransactionHistory);
