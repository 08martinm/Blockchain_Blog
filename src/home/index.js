import React from 'react';
import PropTypes from 'prop-types';
import Nav from './components/Nav';
import Splash from './components/Splash';
import Background from './components/Background';
import Explanation from './components/Explanation';
import Blog from './components/Blog';

const Home = props => {
  return (
    <div className='row'>
      <Nav handleAuth={props.handleAuth}/>      
      <Blog />
      <Splash />
      <Background />
      <Explanation />
    </div>
  );
};

Home.propTypes = {
  handleAuth: PropTypes.object.isRequired,
};

export default Home;
