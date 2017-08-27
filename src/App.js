import React from 'react';
import Nav from './components/Nav';
import Splash from './components/Splash';
import Background from './components/Background';
import Explanation from './components/Explanation';
import Blog from './components/Blog';
import styles from './App.css';

const App = () => {
  return (
    <div className={`container-fluid ${styles.base}`}>
      <Nav />
      <Splash />
      <Background />
      <Explanation />
      <Blog />
    </div>
  );
};

export default App;
