import React, { Component } from 'react';

const styles = [
  {
    backgroundColor: '#f5f7fa'
  },
  {
    backgroundColor: 'white'
  }
]

class Trade extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.trade.ledger_close_time);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    var el = document.createElement('textarea');
    el.value = (this.props.direction == 'in') ? this.props.trade.base_account : this.props.trade.counter_account;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    M.toast({ html: 'Copied to clipboard' });
  }

  render() {
    if (this.props.direction == 'in') {
      return (
        <div className="tx" style={ (this.props.index % 2 == 0) ? styles[0] : styles[1] }>
          <i style={{ width: '10%' }} className="material-icons">arrow_forward</i>
          <div style={{ width: '25%', minWidth: '100px', paddingRight: '10px' }}><p><span style={{color: 'green', fontSize: '18px'}}>+ </span>{ this.props.trade.base_amount + ' XLM' }</p></div>
          <div style={{ width: '20%', minWidth: '100px' }}><p>XLM Settlement</p></div>
          <div style={{ width: '20%', minWidth: '100px' }}><p className="selectable" style={{ width: '100px' }} onClick={ this.copyToClipboard }>{ this.props.trade.base_account.slice(0, 5) }...{ this.props.trade.base_account.slice(this.props.trade.base_account.length - 5, this.props.trade.base_account.length) }</p></div>
          <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.date.toDateString() }</p></div>
        </div>
      );
    } else {
      return (
        <div className="tx" style={ (this.props.index % 2 == 0) ? styles[0] : styles[1] }>
          <i style={{ width: '10%' }} className="material-icons">arrow_back</i>
          <div style={{ width: '25%', minWidth: '100px', paddingRight: '10px' }}><p><span style={{color: 'red', fontSize: '18px'}}>- </span>{ this.props.trade.base_amount + ' XLM' }</p></div>
          <div style={{ width: '20%', minWidth: '100px' }}><p>XLM Settlement</p></div>
          <div style={{ width: '20%', minWidth: '100px' }}><p className="selectable" style={{ width: '100px' }} onClick={ this.copyToClipboard }>{ this.props.trade.counter_account.slice(0, 5) }...{ this.props.trade.counter_account.slice(this.props.trade.counter_account.length - 5, this.props.trade.counter_account.length) }</p></div>
          <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.date.toDateString() }</p></div>
        </div>
      );
    }
  }
}

export default Trade;
