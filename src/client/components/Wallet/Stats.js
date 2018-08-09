import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InflationModal from './InflationModal';
import XLMModal from './XLMModal';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 'Loading...',
      change: ''
    };
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=XLM&tsyms=USD')
    .then(data => data.json())
    .then(stats => {
      this.setState({
        price: stats.DISPLAY.XLM.USD.PRICE,
        change: stats.DISPLAY.XLM.USD.CHANGEPCT24HOUR + '%',
        gainedValue: (stats.DISPLAY.XLM.USD.CHANGEPCT24HOUR.charAt(0) == '-') ? false : true
      })
    })
  }

  handleSelect(e) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(e.target.id));
        return range.select;
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(e.target.id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
  }

  render() {
    return (
      <div className="account-info-container">
        <div className="header-container">
          <div className="wrapper" style={{fontSize: '18px'}}>Account ID: <a id="account"
          style={{fontSize: '16px', borderBottom: '1px dotted rgba(119, 119, 119, 0.4)'}} onClick={ this.handleSelect }>{ this.props.accountId }</a></div>
        </div>
        <div className="content">
          <div className="stats-container">
            <h5 style={{ marginTop: '0px', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ height: '50px', width: '50px' }} src="/assets/stellar-logo.png" />XLM</h5>
            <div>
              <p style={{ fontSize: '12px', textAlign: 'center' }}>Current Price</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ fontSize: '16px' }}>{ this.state.price }</p>
                <p style={{ marginLeft: '15px', backgroundColor: '#f2f6f9', borderRadius: '2px', fontSize: '13px', width: (this.state.change) ? '50px' : '0px', color: (this.state.gainedValue) ? 'green' : 'red', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  { this.state.change }
                </p>
              </div>
            </div>
          </div>
          <div className="button-box">
            <div className="button-container" style={{width: '33%'}}>
              <Link to="/wallet/pay">
                <div className="btn btn-large waves-effect waves-light blue-button"><i className="material-icons">send</i></div>
              </Link>
              <p>Send Funds</p>
            </div>
            <div className="button-container" style={{width: '34%'}}>
              <div className="modal-trigger btn btn-large waves-effect waves-dark white-button" href="#xlmmodal"><i className="material-icons">compare_arrows</i></div>
              <p>XLM Buyback</p>
            </div>
            <div className="button-container" style={{width: '33%'}}>
              <div className="modal-trigger btn btn-large waves-effect waves-light blue-button" href="#inflationmodal"><i className="material-icons">edit</i></div>
              <p>Inflation</p>
            </div>
          </div>
        </div>
        <InflationModal privkey={ this.props.privkey } inflation={ this.props.inflation } loadAccount={ this.props.loadAccount }/>
        <XLMModal />
      </div>
    );
  }
}

export default Stats;
