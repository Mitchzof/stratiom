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
    this.payments = [];
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.props.account.payments({ order: "desc", limit: 50 }).then(payments => {
      this.payments = payments.records;
      console.log(payments.next());
      this.setState({ loading: false });
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let rows = [];

    this.payments.forEach(tx => {
      console.log(tx);
      if (tx.from == this.props.account.account_id) {
        tx.direction = 'out';
      } else {
        tx.direction = 'in';
      }

      if ((tx.type == 'payment' || tx.type == 'path_payment') && tx.asset_code == 'STRTMUSD') {
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
            <div className="tx">
            <div style={{width: '15%'}}></div>
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
