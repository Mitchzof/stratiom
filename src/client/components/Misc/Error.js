import React, { Component } from 'react';

class Error extends Component {

  render() {
    return (
        <div className="col s12" style={{height: '100vh'}}>
          <div className="row center-align">
            <div className="error-page">
              <h1>
                404
              </h1>
              <p>
                Page not found
              </p>
            </div>
          </div>
          <div className="row center-align">
            <p>The site configured at this address does not contain the requested file.</p>
            <p>If you think this is a mistake, please submit an issue <a href="https://github.com/mitchzof/stratiom/issues">here</a>.</p>
          </div>
        </div>
    );
  }
}

export default Error;
