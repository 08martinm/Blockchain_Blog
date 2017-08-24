import React from 'react';
import Nav from './components/Nav/index';
import Splash from './components/Splash/index';
import Background from './components/Background/index';
import Explanation from './components/Explanation/index';
import styles from './App.css';

const App = () => {
  return (
    <div className={styles['base-css']}>
      <Nav />
      <Splash />
      <Background />
      <Explanation />
    </div>
  );
};

export default App;
