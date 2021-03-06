import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper';

const styles = [
  {
    backgroundColor: '#f5f7fa'
  },
  {
    backgroundColor: 'white'
  }
]

class PassiveOffer extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  delete() {
    this.setState({ loading: true });
    stellar.deleteOffer(this.props.privkey, this.props.offer.id, this.props.offer.buying.asset_issuer).then(res => {
      stellar.loadAccount(stellar.privkeyToPubkey(this.props.privkey)).then(acc => {
        this.props.loadAccount(acc);
        M.toast({ html: 'Success: Offer deleted', classes: 'success-toast' });
        if (this.mounted) {
          this.setState({ loading: false, deleted: true });
        }
      });
    }).catch(e => {
      if (this.mounted) {
        this.setState({ loading: false });
      }
      console.log(e);
      M.toast({ html: 'Error: Failed to delete offer', classes: 'error-toast' });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="passive-offer" style={{ height: '63px', backgroundColor: (this.props.index % 2 == 0) ? '#f5f7fa' : 'white' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            Deleting...
          </div>
        </div>
      );
    }
    return (
      <div className="passive-offer" id={ this.props.offer.id } style={ (this.state.deleted) ? {display: 'none'} : (this.props.index % 2 == 0) ? styles[0] : styles[1] }>
        <div className="offer-content" style={{ width: '70%', minWidth: '275px' }}><p>{ this.props.offer.buying.asset_issuer }</p></div>
        <div className="offer-content" style={{ width: '15%', minWidth: '75px' }}><p>${ this.props.offer.amount.slice(0, this.props.offer.amount.length - 5) }</p></div>
        <div className="offer-content" style={{ width: '10%', minWidth: '50px' }}><p>{ this.props.offer.price.slice(0, this.props.offer.price.length - 4) }</p></div>
        <div className="offer-content" style={{ width: '5%', minWidth: '20px' }}><a onClick={ this.delete } className="delete"><i className="tiny material-icons">close</i></a></div>
      </div>
    );
  }
}

export default PassiveOffer;
