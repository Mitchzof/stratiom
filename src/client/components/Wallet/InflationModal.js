import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper.js';
import Loader from '../Misc/Loader';

class InflationModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: false,
      loading: false,
      inflation: (this.props.inflation) ? this.props.inflation : ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let instance = M.Modal.getInstance(document.getElementById('inflationmodal'));
    this.setState({ loading: true });
    stellar.setInflation(this.props.privkey, this.state.inflation)
    .then(res => {
      if (this.mounted) {
        this.setState({ loading: false });
        stellar.loadAccount(stellar.privkeyToPubkey(this.props.privkey)).then(acc => {
          this.props.loadAccount(acc);
        });
      }
      M.toast({ html: 'Success: Inflation address modified', classes: 'success-toast' });
    }).catch(err => {
      if (this.mounted) {
        this.setState({ loading: false });
      }
      M.toast({ html: 'Error: Failed to modify inflation', classes: 'error-toast' });
    })
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleChange(e) {
    if (e.target.id == "check") {
      this.setState({ checked: !this.state.checked });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div id="inflationmodal" className="modal">
          <div className="modal-content">
            <div className="loader-container" style={{ padding: '50px 0px 50px 0px', marginTop: '0px' }}>
              <Loader />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div id="inflationmodal" className="modal">
        <div className="modal-content">
          <form className="col s10 offset-s1">
            <div className="row">
              <h6><b>Inflation Destination</b></h6>
              <p>
                By setting an inflation destination, you are effectively voting (weighted by
                the amount of XLM you hold) on an account to receive inflation.  This can be changed
                at any time.
              </p>
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input value={ this.state.inflation } id="inflation" type="text" className="validate" onChange={ this.handleChange } />
                <label className='active' htmlFor="inflation">Account ID</label>
              </div>
            </div>
            <div className="row">
              <p>
                <label>
                  <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                  <span>
                    I would like to modify my inflation destination
                  </span>
                </label>
              </p>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className={
            (this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
          } onClick={ this.handleSubmit }>Submit</button>
          <a className="modal-close waves-effect waves-green btn-flat" onClick={ this.handleClose }>Cancel</a>
        </div>
      </div>
    );
  }
}

export default InflationModal;
