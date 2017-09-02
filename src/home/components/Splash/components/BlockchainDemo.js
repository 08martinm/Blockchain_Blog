import React from 'react';
import Cube from './Cube';
import Transactions from './Transactions';
import Computations from './Computations';
import RightArrow from './RightArrow';
import styles from '../styles/splash.scss';

const BlockchainDemo = () => {
  return (
    <div className={`${styles.container}`}>
      <Computations />
      <RightArrow num={1} />
      <Transactions />
      <RightArrow num={2} />
      <Cube />
    </div>
  );
};

export default BlockchainDemo;
