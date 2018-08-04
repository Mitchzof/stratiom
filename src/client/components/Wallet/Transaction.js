import React, { Component } from 'react';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.tx.created_at);
    this.expand = this.expand.bind(this);
    this.state = {
      expanded: false
    }
  }

  expand(e) {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    var content = <div></div>;

    if (this.props.tx.direction == 'in') {
      content = <div className="tx tx-in">
        <i style={{ width: '10%' }} className="material-icons">arrow_forward</i>
        <div style={{ width: '20%', minWidth: '100px' }}><p>${ this.props.tx.amount.slice(0, this.props.tx.amount.length - 5) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ (this.props.tx.isRefund) ? 'Debt Settlement' : (this.props.tx.type == 'payment') ? 'Direct Payment' : 'Path Payment' }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.props.tx.from.slice(0, 5) }...{ this.props.tx.from.slice(this.props.tx.from.length - 5, this.props.tx.from.length) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.date.toDateString() }</p></div>
        <div style={{ width: '5%', minWidth: '25px' }}><a href={ "https://stellar.expert/explorer/public/tx/" + this.props.tx.transaction_hash } target='_blank'><i className="material-icons tiny">call_made</i></a></div>
        <div style={{ width: '2%', minWidth: '20px' }}>{ (this.props.tx.memo) ?
          <a className="dropdown" style={{color: '#2c662d' }} onClick={ this.expand }>
            {
              (this.state.expanded) ?
              <i className="material-icons">arrow_drop_up</i> :
              <i className="material-icons">arrow_drop_down</i>
            }
          </a> : <div></div> }
        </div>
        <div className="tx-expansion" style={{maxHeight: (this.state.expanded) ? '500px' : '0px' }}>
          <p><b>Note:</b> { this.props.tx.memo }</p>
        </div>
      </div>;
    } else {
      content = <div className="tx tx-out">
        <i style={{ width: '10%' }} className="material-icons">arrow_back</i>
        <div style={{ width: '20%', minWidth: '100px' }}><p>${ this.props.tx.amount.slice(0, this.props.tx.amount.length - 5) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ (this.props.tx.isRefund) ? 'Debt Settlement' : (this.props.tx.type == 'payment') ? 'Direct Payment' : 'Path Payment' }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.props.tx.to.slice(0, 5) }...{ this.props.tx.to.slice(this.props.tx.to.length - 5, this.props.tx.to.length) }</p></div>
        <div style={{ width: '20%', minWidth: '100px' }}><p>{ this.date.toDateString() }</p></div>
        <div style={{ width: '5%', minWidth: '15px' }}><a href={ "https://stellar.expert/explorer/public/tx/" + this.props.tx.transaction_hash } target='_blank'><i className="material-icons tiny">call_made</i></a></div>
        <div style={{ width: '2%', minWidth: '10px' }}>{ (this.props.tx.memo) ?
          <a className="dropdown" style={{color: '#9f3a38' }} onClick={ this.expand }>
            {
              (this.state.expanded) ?
              <i className="material-icons">arrow_drop_up</i> :
              <i className="material-icons">arrow_drop_down</i>
            }
          </a> : <div></div> }
        </div>
        <div className="tx-expansion" style={{maxHeight: (this.state.expanded) ? '500px' : '0px' }}>
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
