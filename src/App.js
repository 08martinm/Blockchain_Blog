import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './home/components/Nav';
import Splash from './home/components/Splash';
import Background from './home/components/Background';
import Explanation from './home/components/Explanation';
import Blog from './home/components/Blog';
import Verify from './pages/verify';
import styles from './App.css';

const App = () => {
  return (
    <Router>
      <div className={`container-fluid ${styles.base}`}>
        <Nav />
        <Route exact path="/" component={Home}/>
        <Route path="/api/verify" component={Verify}/>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div className='row'>
      <Splash />
      <Background />
      <Explanation />
      <Blog />
    </div>
  );
};

export default App;
