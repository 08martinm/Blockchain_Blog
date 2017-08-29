import React from 'react';
import styles from '../styles/splash.scss';
import classnames from 'classnames';

const ArrowWrapper = () => {
  return (
    <div className={`col-xs-1 ${styles['arrow-container-1']}`}>
      <i className={classnames('fa fa-long-arrow-right', styles['arrow-right'], styles['arrow-1'])} aria-hidden='true'></i>
    </div>
  );
};

export default ArrowWrapper;
