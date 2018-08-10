import React, { Component } from 'react';

const styles = [
  {
    backgroundColor: '#f5f7fa'
  },
  {
    backgroundColor: 'white'
  }
]

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.tx.created_at);
    this.expand = this.expand.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.state = {
      expanded: false
    }
  }

  copyToClipboard() {
    var el = document.createElement('textarea');
    el.value = (this.props.tx.direction == 'in') ? this.props.tx.from : this.props.tx.to;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    M.toast({ html: 'Copied to clipboard' });
  }

  expand(e) {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    var content = <div></div>;

    if (this.props.tx.direction == 'in') {
      content = <div className="tx" style={ (this.props.index % 2 == 0) ? styles[0] : styles[1] }>
        <i style={{ width: '10%' }} className="material-icons">arrow_forward</i>
        <div style={{ width: '20%', minWidth: '100px' }}><p><span style={{color: 'green', fontSize: '18px'}}>+ </span>${ this.props.tx.amount.slice(0, this.props.tx.amount.length - 5) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ (this.props.tx.isRefund) ? 'Debt Settlement' : (this.props.tx.type == 'payment') ? 'Direct Payment' : 'Path Payment' }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p className="selectable" style={{ width: '100px' }} onClick={ this.copyToClipboard }>{ this.props.tx.from.slice(0, 5) }...{ this.props.tx.from.slice(this.props.tx.from.length - 5, this.props.tx.from.length) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.date.toDateString() }</p></div>
        <div style={{ width: '5%', minWidth: '15px' }}><a href={ (TESTNET) ? "https://stellar.expert/explorer/testnet/tx/" + this.props.tx.transaction_hash : "https://stellar.expert/explorer/public/tx/" + this.props.tx.transaction_hash } target='_blank'><i className="material-icons tiny">call_made</i></a></div>
        <div style={{ width: '2%', minWidth: '20px' }}>{ (this.props.tx.memo) ?
          <a className="dropdown" onClick={ this.expand }>
            {
              (this.state.expanded) ?
              <i className="material-icons">arrow_drop_up</i> :
              <i className="material-icons">arrow_drop_down</i>
            }
          </a> : <div></div> }
        </div>
        <div className="tx-expansion" style={{ display: 'flex', justifyContent: 'center', maxHeight: (this.state.expanded) ? '500px' : '0px' }}>
          <p><b>Note:</b> { this.props.tx.memo }</p>
        </div>
      </div>;
    } else {
      content = <div className="tx" style={ (this.props.index % 2 == 0) ? styles[0] : styles[1] }>
        <i style={{ width: '10%' }} className="material-icons">arrow_back</i>
        <div style={{ width: '20%', minWidth: '100px' }}><p><span style={{color: 'red', fontSize: '18px'}}>- </span>${ this.props.tx.amount.slice(0, this.props.tx.amount.length - 5) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ (this.props.tx.isRefund) ? 'Debt Settlement' : (this.props.tx.type == 'payment') ? 'Direct Payment' : 'Path Payment' }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p className="selectable" onClick={ this.copyToClipboard } style={{ width: '100px' }}>{ this.props.tx.to.slice(0, 5) }...{ this.props.tx.to.slice(this.props.tx.to.length - 5, this.props.tx.to.length) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.date.toDateString() }</p></div>
        <div style={{ width: '5%', minWidth: '15px' }}><a href={ (TESTNET) ? "https://stellar.expert/explorer/testnet/tx/" + this.props.tx.transaction_hash : "https://stellar.expert/explorer/public/tx/" + this.props.tx.transaction_hash } target='_blank'><i className="material-icons tiny">call_made</i></a></div>
        <div style={{ width: '2%', minWidth: '10px' }}>{ (this.props.tx.memo) ?
          <a className="dropdown" onClick={ this.expand }>
            {
              (this.state.expanded) ?
              <i className="material-icons">arrow_drop_up</i> :
              <i className="material-icons">arrow_drop_down</i>
            }
          </a> : <div></div> }
        </div>
        <div className="tx-expansion" style={{ display: 'flex', justifyContent: 'center', maxHeight: (this.state.expanded) ? '500px' : '0px' }}>
          <p><b>Note:</b> { this.props.tx.memo }</p>
        </div>
      </div>;
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

export default Transaction;
