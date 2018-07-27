import React, { Component } from 'react';

class MidContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mid-container">
        <p>
          { this.props.content }
        </p>
      </div>
    );
  }
}

export default MidContainer;
