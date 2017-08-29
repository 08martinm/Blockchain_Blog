import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/transaction.css';
import classnames from 'classnames';

const Transaction = (props) => {
  return (
    <div className={styles.outer}>
      <div className={classnames(styles.ledger, styles.hash)}>{props.hash}</div>
      <div className={classnames(styles.ledger, styles.value)}>{props.val}</div>
    </div>
  );
};

Transaction.propTypes = {
  hash: PropTypes.string.isRequired,
  val: PropTypes.number.isRequired,
};

export default Transaction;
