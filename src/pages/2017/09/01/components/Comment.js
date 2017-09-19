import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comments.scss';
import {Link} from 'react-router-dom';
import AddPost from './AddPost.js';

const Comment = props => {
  let flair = '', post = '';
  if (props.post.username === '08martinm') flair = 'by-author';
  if (props.post.username === props.handleAuth.username && props.post.username != null) flair = 'you';
  if (props.post.addPost) post = 'post';

  return (
    <div>
      <div className={`${styles['comment-box']} ${styles[post]}`}>
        <div className={`${styles['comment-head']} ${styles[post]}`}>
          <h6 className={`${styles['comment-name']} ${styles[flair]}`}><a href='http://creaticode.com/blog'>{props.post.username}</a></h6>
          <span>{props.post.create_date}</span>
          {!props.post.addPost && props.level === 1 && <i className='fa fa-reply'></i>}
          <i className='fa fa-heart'></i>
          <i>{props.post.likes}</i>
        </div>
        <div className={styles['comment-content']}>
          {!props.post.addPost ? 
            props.post.comment :
            props.handleAuth.loggedin ? 
              <AddPost submitPost={props.submitPost} parent_id={props.post.parent_id}/> :
              <div>To post a comment, please <Link to='/login'>sign in</Link>.</div>
          }
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  post: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  handleAuth: PropTypes.object.isRequired,
  submitPost: PropTypes.func.isRequired,
};

export default Comment;
