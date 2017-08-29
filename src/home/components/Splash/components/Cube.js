import React from 'react';
import classnames from 'classnames';
import styles from '../styles/cube.scss';

const Cube = () => {
  return (
    <div className={'col-xs-3'}>
      <div className={styles.cylinder}></div>
      <div className={styles.cube}>
        <section className={classnames(styles.side, styles.front)} />
        <section className={classnames(styles.side, styles.back)} />
        <section className={classnames(styles.side, styles.top)} />
        <section className={classnames(styles.side, styles.bottom)} />
        <section className={classnames(styles.side, styles.left)} />
        <section className={classnames(styles.side, styles.right)} />
      </div>
    </div>
  );
};

export default Cube;
