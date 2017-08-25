import React from 'react';
import styles from './styles/splash.scss';
import BlockchainDemo from './components/BlockchainDemo';

const Splash = () => {
  return (
    <div className={styles['splash-container']}>
      <div className={styles['landing-wrapper']}>
        <BlockchainDemo />
        <div className={styles['arrow-wrapper']}>
          <i className={`fa fa-arrow-down ${styles['down-arrow']}`}></i>
        </div>
      </div>
    </div>
  );
};

export default Splash;
