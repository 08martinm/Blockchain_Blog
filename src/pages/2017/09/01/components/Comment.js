import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comments.scss';

// const Comment = props => (
//   <div className={`container ${styles.comment}`}>
//     <div className={`row ${styles.info}`}>
//       <div className={styles.voteicon}>
//         <i className={`${styles.vote} ${styles.voteup} fa fa-arrow-up`} aria-hidden='true' />
//         <i className={`${styles.vote} ${styles.votedown} fa fa-arrow-down`} aria-hidden='true' />
//       </div>
//       <div className={styles.username}>{props.post.username}</div>
//     </div>
//     <div className='row'>{props.post.comment}</div>
//   </div>
// );

// Comment.propTypes = {
//   post: PropTypes.object.isRequired,
// };

// export default Comment;
//<div className={styles['comment-avatar']}><img src='http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg' alt='' /></div>

const Comment2 = props => (
  <div>
    <div className={styles['comment-box']}>
      <div className={styles['comment-head']}>
        <h6 className={`${styles['comment-name']} ${styles['by-author']}`}><a href='http://creaticode.com/blog'>{props.post.username}</a></h6>
        <span>{props.post.create_date}</span>
        {props.level === 1 && <i className='fa fa-reply'></i>}
        <i className='fa fa-heart'></i>
        <i>{props.post.likes}</i>
      </div>
      <div className={styles['comment-content']}>
        {props.post.comment}
      </div>
    </div>
  </div>
);

Comment2.propTypes = {
  post: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
};

export default Comment2;
