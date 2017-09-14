import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comment.scss';

const Comment = props => (
  <div className={`container ${styles.comment}`}>
    <div className={`row ${styles.info}`}>
      <div className={styles.voteicon}>
        <i className={`${styles.vote} ${styles.voteup} fa fa-arrow-up`} aria-hidden='true' />
        <i className={`${styles.vote} ${styles.votedown} fa fa-arrow-down`} aria-hidden='true' />
      </div>
      <div className={styles.username}>{props.post.username}</div>
    </div>
    <div className='row'>{props.post.comment}</div>
  </div>
);

Comment.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comment;