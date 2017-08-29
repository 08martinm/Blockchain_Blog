import React from 'react';
import Cube from './Cube';
import Transactions from './Transactions';
import Computations from './Computations';
import RightArrow from './RightArrow';
import styles from '../styles/splash.scss';

const BlockchainDemo = () => {
  return (
    <div className={`row ${styles.container}`}>
      <Computations />
      <RightArrow />
      <Transactions />
      <RightArrow />
      <Cube />
    </div>
  );
};

export default BlockchainDemo;
