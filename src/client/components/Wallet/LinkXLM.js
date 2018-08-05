import React, { Component } from 'react';
import * as stellar from './helpers/stellarHelper.js';
import Loader from '../Misc/Loader';

class LinkXLM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="modal-content">
            <div className="loader-container" style={{ padding: '50px 0px 50px 0px', marginTop: '0px' }}>
              <Loader />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="modal-content">
          Test
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-green btn-flat" onClick={ this.handleClose }>Cancel</a>
        </div>
      </div>
    );
  }
}

export default LinkXLM;
