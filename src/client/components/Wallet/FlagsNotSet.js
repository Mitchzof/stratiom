import React, { Component } from 'react';
import Loader from '../Misc/Loader';
import * as stellar from './helpers/stellarHelper';

/*
  Component not currently in use.
*/
class FlagsNotSet extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false
    }
  }

  handleClick() {
    this.props.loadAccount();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    stellar.setFlags(this.props.privkey).then(res => {
      console.log(res);
      if (this.mounted) {
        this.props.loadAccount();
        M.toast({ html: 'Success: Flags have been set', classes: 'success-toast' });
      }
    }).catch(err => {
      if (this.mounted) {
        M.toast({ html: 'Error: Flags failed to set', classes: 'error-toast' });
        this.setState({ loading: false });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      );
    }
    return (
      <div className="panel-container">
        <div className="panel-header" style={{display: 'flex', justifyContent: 'space-between'}}>
            <h6>
              Set Authorization Flags
            </h6>
            <a className="refresh-button" onClick={ this.handleClick }><i className="material-icons">refresh</i></a>
        </div>
        <div className="row panel-content">
          <div className="col s12">
            <div className="row">
              <p>
                Your account has been activated, though the account flags necessary to use
                Stratiom have not been set.  Would you like to set the AUTHORIZATION_REQUIRED
                and AUTHORIZATION_REVOCABLE flags?  These ensure that holders of your debt
                asset have been authorized to do so, and enables you to revoke that authorization
                under special circumstances.
              </p>
            </div>
            <div className="row center-align">
              <button className="btn waves-effect waves-light btn-primary" onClick={ this.handleSubmit }>Set Flags</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlagsNotSet;
