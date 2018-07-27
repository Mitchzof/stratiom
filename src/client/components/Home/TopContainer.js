import React, { Component } from 'react';

class TopContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="top-container">
        <div className="content">
          { this.props.content }
        </div>
      </div>
    );
  }
}

export default TopContainer;
