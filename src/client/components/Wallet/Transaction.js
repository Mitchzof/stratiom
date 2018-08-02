import React, { Component } from 'react';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.date = new Date(this.props.tx.created_at);
  }

  render() {
    var content = <div></div>;

    if (this.props.tx.direction == 'in') {
      content = <div className="tx tx-in">
        <i style={{width: '15%'}} className="material-icons">arrow_forward</i>
        <div style={{width: '20%', minWidth: '125px'}}><p>${ this.props.tx.amount.slice(0, this.props.tx.amount.length - 5) }</p></div>
        <div style={{width: '20%', minWidth: '125px'}}><p>{ (this.props.tx.type == 'payment') ? 'Direct Payment' : 'Path Payment' }</p></div>
        <div style={{width: '20%', minWidth: '125px'}}><p>{ this.props.tx.from.slice(0, 5) }...{ this.props.tx.from.slice(this.props.tx.from.length - 5, this.props.tx.from.length) }</p></div>
        <div style={{width: '20%', minWidth: '125px'}}><p>{ this.date.toDateString() }</p></div>
        <div style={{width: '5%'}}><a href={ "https://stellar.expert/explorer/public/tx/" + this.props.tx.transaction_hash } target='_blank'><i className="material-icons tiny">call_made</i></a></div>
      </div>;
    } else if (this.props.tx.direction == 'out') {
      content = <div className="tx tx-out">
        <i style={{width: '15%'}} className="material-icons">arrow_back</i>
        <div style={{width: '20%', minWidth: '125px'}}><p>${ this.props.tx.amount.slice(0, this.props.tx.amount.length - 5) }</p></div>
        <div style={{width: '20%', minWidth: '125px'}}><p>{ (this.props.tx.type == 'payment') ? 'Direct Payment' : 'Path Payment' }</p></div>
        <div style={{width: '20%', minWidth: '125px'}}><p>{ this.props.tx.to.slice(0, 5) }...{ this.props.tx.to.slice(this.props.tx.to.length - 5, this.props.tx.to.length) }</p></div>
        <div style={{width: '20%', minWidth: '125px'}}><p>{ this.date.toDateString() }</p></div>
        <div style={{width: '5%'}}><a href={ "https://stellar.expert/explorer/public/tx/" + this.props.tx.transaction_hash } target='_blank'><i className="material-icons tiny">call_made</i></a></div>
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
