import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import TopContainer from './TopContainer';
import MidContainer from './MidContainer';
import Footer from './Footer';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Navbar />
        <TopContainer />
        <MidContainer />
        <Footer />
      </div>
    );
  }
}

export default Home;
