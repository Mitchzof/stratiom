import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InflationModal from './InflationModal';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.inflation = this.inflation.bind(this);
  }

  componentDidMount() {
    let elem = document.getElementById('inflationmodal');
    M.Modal.init(elem);
    this.instance = M.Modal.getInstance(elem);
  }

  inflation() {
    this.instance.open();
  }

  render() {
    return (
      <div className="account-info-container">
        <div className="header-container">
          <div className="wrapper" style={{fontSize: '18px'}}><b>Account ID:</b> <a style={{fontSize: '15px'}}>{ this.props.accountId }</a></div>
        </div>
        <div className="content">
          <div className="button-box">
            <div className="button-container">
              <Link to="/wallet/pay">
                <div className="btn-floating btn-large waves-effect waves-light blue-button"><i className="material-icons">send</i></div>
              </Link>
              <p>Send Payment</p>
            </div>
            <div className="button-container">
              <div className="btn-floating btn-large waves-effect waves-light white-button"><i className="material-icons">compare_arrows</i></div>
              <p>Link XLM</p>
            </div>
            <div className="button-container">
              <div className="btn-floating btn-large waves-effect waves-light blue-button" onClick={ this.inflation }><i className="material-icons">edit</i></div>
              <p>Inflation</p>
            </div>
          </div>
        </div>
        <InflationModal privkey={ this.props.privkey } inflation={ this.props.inflation } loadAccount={ this.props.loadAccount }/>
      </div>
    );
  }
}

export default Stats;
