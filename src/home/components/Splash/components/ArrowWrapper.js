import React from 'react';
import styles from '../styles/splash.scss';

const ArrowWrapper = () => {
  return (
    <div className={`row ${styles['arrow-wrapper']}`}>
      <i className={`fa fa-arrow-down ${styles['down-arrow']}`}></i>
    </div>
  );
};

export default ArrowWrapper;
