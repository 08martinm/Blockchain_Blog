import React from 'react';
import styles from './styles/splash.scss';
import BlockchainDemo from './components/BlockchainDemo';
import classnames from 'classnames';

const Splash = () => {
  return (
    <div className={styles['splash-container']}>
      <div className={styles['landing-wrapper']}>
        <BlockchainDemo />
        <div className={styles['arrow-wrapper']}>
          <a className={classnames('fa fa-arrow-down', styles['down-arrow'])}></a>
        </div>
      </div>
    </div>
  );
};

export default Splash;
