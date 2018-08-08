import React, { Component } from 'react';

const styleActive = {
  color: '#3f7bde',
  borderColor: '#3f7bde',
  backgroundColor: '#3f7bde'
}

const styleInactive = {
  color: 'rgba(0, 0, 0, 0.2)',
  borderColor: 'rgba(0, 0, 0, 0.2)',
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
}

class ControlNavTop extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel-container small">
        <div className="tracker-container">
          <div id="1" onClick={ this.props.setStep } className="btn-floating btn-small tracker" style={ (this.props.step >= 1) ? styleActive : styleInactive }>1</div>
          <div className="divider" style={ (this.props.step >= 2) ? styleActive : styleInactive }></div>
          <div id="2" onClick={ this.props.setStep } className="btn-floating btn-small tracker" style={ (this.props.step >= 2) ? styleActive : styleInactive }>2</div>
          <div className="divider" style={ (this.props.step >= 3) ? styleActive : styleInactive }></div>
          <div id="3" onClick={ this.props.setStep } className="btn-floating btn-small tracker" style={ (this.props.step >= 3) ? styleActive : styleInactive }>3</div>
          <div className="divider" style={ (this.props.step >= 4) ? styleActive : styleInactive }></div>
          <div id="4" onClick={ this.props.setStep } className="btn-floating btn-small tracker" style={ (this.props.step >= 4) ? styleActive : styleInactive }>4</div>
        </div>
      </div>
    );
  }
}

export default ControlNavTop;
