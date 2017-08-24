import React from 'react';
import Cube from './Cube';
import Transactions from './Transactions';
import Computations from './Computations';
import styles from '../styles/splash.scss';
import classnames from 'classnames';

const BlockchainDemo = () => {
  return (
    <div className={styles.container}>
      <Computations />
      <div className={styles['arrow-container-1']}>
        <i className={classnames('fa fa-long-arrow-right', styles['arrow-right'], styles['arrow-1'])} aria-hidden='true'></i>
      </div>
      <Transactions />
      <div className={styles['arrow-container-2']}>
        <i className={classnames('fa fa-long-arrow-right', styles['arrow-right'], styles['arrow-2'])} aria-hidden='true'></i>
      </div>
      <Cube />
    </div>
  );
};

export default BlockchainDemo;
