import React, { Component } from 'react';

const selectedStyle = {
  background: 'linear-gradient(to right, rgba(63, 123, 222, 0.2), rgba(63, 123, 222, 0.1))',
  borderTop: '1px solid rgba(63, 123, 222, 0.35)'
}

const unselectedStyle = {
  background: 'transparent',
  borderTop: '1px solid rgba(119, 119, 119, 0.08)'
}

class TrustlineModalRow extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.select(this.props.accountId);
  }

  render() {
    return (
      <div className="trustline-row" style={ (this.props.target == this.props.accountId) ? selectedStyle : unselectedStyle } id={ this.props.accountId } onClick={ this.handleClick }>
        <p><b>Account ID: </b>{ this.props.accountId }</p>
      </div>
    );
  }
}

export default TrustlineModalRow;
