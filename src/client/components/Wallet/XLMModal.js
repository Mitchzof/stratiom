import React, { Component } from 'react';
import LinkXLM from './LinkXLM';

/*
  This modal is the initial modal opened by the "Link XLM" button on the overview.
  Just a warning page before filling content with XLM Link component.
*/
class XLMModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      reviewed: false,
      checked: false
    }
  }

  handleChange(e) {
    if (e.target.id == "check") {
      this.setState({ checked: !this.state.checked });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ reviewed: true });
  }

  render() {
    if (this.state.reviewed) {
      return (
        <div id="xlmmodal" className="modal modal-fixed-footer">
          <LinkXLM />
        </div>
      );
    }

    return (
      <div id="xlmmodal" className="modal">
        <div className="modal-content">
          <form className="col s10 offset-s1">
            <div className="row">
              <h6><b>Link XLM to Debt Asset</b></h6>
              <p>
                <b>WARNING: </b>This can be extremely dangerous and can result in a loss of
                XLM if used carelessly or improperly.  Read the following if you are in any
                way unsure of what this feature does or how to use it.
              </p>
              <p>
                This feature enables you to create a buy offer to settle your debts (buy-back your
                debt asset).  This can make debt settlement a much easier process, though it means
                that ANY holder of your asset may exchange your debt asset for XLM.
              </p>
              <p>
                The dangers of this arise if an untrusted user is being supported for path payments,
                as that user could exploit your passive offer to obtain debt, and exchange it for XLM.
                For this reason, it is recommended that you set low amounts of XLM to these orders, and make
                sure that you are not mediating payments for any untrusted users.
              </p>
            </div>
            <div className="row">
              <p>
                <label>
                  <input id="check" type="checkbox" className="filled-in" checked={ this.state.checked } onChange={ this.handleChange } />
                  <span>
                    I have read the warnings and would like to proceed.
                  </span>
                </label>
              </p>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className={
            (this.state.checked) ? "btn waves-effect waves-light btn-primary" : "btn disabled"
          } onClick={ this.handleSubmit }>Continue</button>
          <a className="modal-close waves-effect waves-green btn-flat" onClick={ this.handleClose }>Cancel</a>
        </div>
      </div>
    );
  }
}

export default XLMModal;
