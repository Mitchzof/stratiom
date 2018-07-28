import React, { Component } from 'react';
import { Link } from 'react-router-dom';

let initialStyle = {
  backgroundColor: "rgba(255, 255, 255, 0)",
  boxShadow: "1px 1px 1px 1px rgba(119, 119, 119, 0)",
}

let scrolledStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderBottom: "0px solid rgba(119, 119, 119, 0.15)",
  boxShadow: "1px 1px 1px 1px rgba(119, 119, 119, 0.20)",
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

    let style = (this.props.fixed) ? scrolledStyle : initialStyle;
    let color = (this.props.fixed) ? '#505558' : 'white';

    this.state = {
      style: style,
      color: color,
      scrollY: 0
    }
  }

  componentDidMount() {
    if (!this.props.fixed) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (!this.props.fixed) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll() {
    if (window.scrollY != 0 && this.state.scrollY == 0) {
      this.setState({ style: scrolledStyle, scrollY: window.scrollY, color: '#505558' });
    } else if (window.scrollY == 0 && this.state.scrollY != 0) {
      this.setState({ style: initialStyle, scrollY: window.scrollY, color: 'white' });
    }
  }

  render() {
    return (
      <div className="navbar-fixed" style={{ marginBottom: '-64px' }}>
        <nav className="nav-fade" style={ this.state.style }>
          <div className="nav-wrapper">
            <Link to="/">
              <div className="brand-logo logo-container" style={{color: this.state.color}}>
                Stratiom
              </div>
            </Link>
            <ul id="nav-mobile" className="right" style={{marginRight: '50px'}}>
              <li><Link to="/wallet">
                <div style={{color: this.state.color}}>
                  Login
                </div>
              </Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
