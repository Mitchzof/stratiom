import React, { Component } from 'react';
import { connect } from 'react-redux';
import Trade from './Trade';
import Loader from '../Misc/Loader';

const mapStateToProps = state => {
  return {
    account: state.user.account
  }
}

class XLMHistory extends Component {
  constructor(props) {
    super(props);
    this.counter = 0;
    this.trades = [];
    this.loadTrades = this.loadTrades.bind(this);
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
    this.props.account.trades({ order: "desc", limit: 100 }).then(trades => {
      this.loadTrades(trades);
    }).catch(e => {
      setTimeout(this.initialize, 1500);
    });
  }

  loadTrades(trades) {
    if (trades.records.length > 0) {
      this.trades = this.trades.concat(trades.records);
      trades.next().then(trades => {
        this.loadTrades(trades);
      })
    } else {
      if (this.mounted) {
        this.setState({ loading: false });
        let info = document.getElementById('info');
        M.Modal.init(info);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let rows = [];
    var count = 0;

    this.trades.forEach(trade => {
      if (trade.base_asset_type == 'native' && trade.counter_asset_code == 'STRTMUSD') {
        rows.push(<Trade key={ trade.id } trade={ trade } index={ count } direction={ (this.props.account.account_id == trade.base_account) ? 'out' : 'in' } />);
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
              XLM Settlement History
            </h6>
            <a href="#info" className="modal-trigger info"><i className="material-icons">info_outline</i></a>
          </div>
          <div className="transaction-container">
            {
              (rows.length > 0) ?
              <div className="tx" style={{ borderTop: '0px' }}>
                <div style={{width: '10%'}}></div>
                <div style={{width: '25%'}}><p>Amount</p></div>
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
                  You have not yet settled any debts with XLM.
                </p>
              </div>
            }
          </div>
        </div>
        <div id="info" className="modal">
          <div className="modal-content">
            <p>This component displays the history of debt settlements via XLM orders.</p>
            <p>Note that this component does not display path participation, nor does it display transaction
            history as these are considered different modes of payment.  It
            exclusively displays debt settlements that occured through an exchange of XLM.</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-dark btn-flat">Close</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(XLMHistory);
