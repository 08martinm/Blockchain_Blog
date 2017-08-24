import React from 'react';
import styles from '../styles/computations.scss';
import classnames from 'classnames';

const Computations = () => {
  return (
    <div className={styles.wrapper}>
      <i className={classnames('fa fa-desktop', styles.computer, styles.c1)} aria-hidden='true'>
        <div className={styles['bolt-wrapper']}><i className={classnames('fa fa-bolt', styles.bolt)} aria-hidden='true'></i></div>
      </i>
      <i className={classnames('fa fa-desktop', styles.computer, styles.c2)} aria-hidden='true'>
        <div className={styles['bolt-wrapper']}><i className={classnames('fa fa-bolt', styles.bolt)} aria-hidden='true'></i></div>
      </i>
      <i className={classnames('fa fa-desktop', styles.computer, styles.c3)} aria-hidden='true'>
        <div className={styles['bolt-wrapper']}><i className={classnames('fa fa-bolt', styles.bolt)} aria-hidden='true'></i></div>
      </i>
    </div>
  );
};

export default Computations;
