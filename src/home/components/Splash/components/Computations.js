import React from 'react';
import styles from '../styles/computations.scss';

const Bolt = () => <div className={styles['bolt-wrapper']}><i className={`fa fa-bolt ${styles.bolt}`}/></div>;

const Computations = () => {
  return (
    <div className={`col-xs-3 ${styles.wrapper}`}>
      <i className={`fa fa-desktop ${styles.computer} ${styles.c1}`}><Bolt/></i>
      <i className={`fa fa-desktop ${styles.computer} ${styles.c2}`}><Bolt/></i>
      <i className={`fa fa-desktop ${styles.computer} ${styles.c3}`}><Bolt/></i>
    </div>
  );
};

export default Computations;
