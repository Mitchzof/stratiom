import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InflationModal from './InflationModal';
import XLMModal from './XLMModal';

class Stats extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
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
          <div className="wrapper" style={{fontSize: '18px'}}><b>Account ID:</b> <a id="account"
          style={{fontSize: '15px', borderBottom: '1px dotted rgba(119, 119, 119, 0.4)'}} onClick={ this.handleSelect }>{ this.props.accountId }</a></div>
        </div>
        <div className="content">
          <div className="button-box">
            <div className="button-container" style={{width: '33%'}}>
              <Link to="/wallet/pay">
                <div className="btn-floating btn-large waves-effect waves-light blue-button" style={{ height: '65px', width: '65px' }}><i className="material-icons">send</i></div>
              </Link>
              <p>Send Payment</p>
            </div>
            <div className="button-container" style={{width: '34%'}}>
              <div className="modal-trigger btn-floating btn-large waves-effect waves-dark white-button" href="#xlmmodal" style={{ height: '65px', width: '65px' }}><i className="material-icons">compare_arrows</i></div>
              <p>Link XLM</p>
            </div>
            <div className="button-container" style={{width: '33%'}}>
              <div className="modal-trigger btn-floating btn-large waves-effect waves-light blue-button" href="#inflationmodal" style={{ height: '65px', width: '65px' }}><i className="material-icons">edit</i></div>
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
