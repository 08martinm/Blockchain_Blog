import React from 'react';
import styles from './styles/splash.scss';
import BlockchainDemo from './components/BlockchainDemo';
import ArrowWrapper from './components/ArrowWrapper';

const Splash = () => {
  return (
    <div className={`row ${styles.container1}`}>
      <BlockchainDemo />
      <ArrowWrapper />
    </div>
  );
};

export default Splash;
