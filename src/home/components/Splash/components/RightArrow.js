import React from 'react';
import styles from '../styles/splash.scss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const RightArrow = props => {
  let class_name_2 = 'arrow-' + props.num.toString();

  return (
    <div className={classnames('col-xs-1', styles['arrow-container'])}>
      <i className={classnames('fa fa-long-arrow-right', styles['arrow-right'], styles[class_name_2])} aria-hidden='true'></i>
    </div>
  );
};

RightArrow.propTypes = {
  num: PropTypes.number.isRequired,
};

export default RightArrow;
