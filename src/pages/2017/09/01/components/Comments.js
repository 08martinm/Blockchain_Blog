import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comments.scss';
import styles1 from '../styles/Lesson1.scss';
import Comment from './Comment.js';

const Comments = props => (
  <div className={styles1.comments}>
    <h2 className='text-center'>Comments</h2>
    <h3 className='text-center'>{`${props.title}`}</h3>
    <div className={styles1.divider}/>
    <div className={styles['comments-container']}>
      <ul id={styles['comments-list']} className={styles['comments-list']}>
        <CommentsContainer submitPost={props.submitPost} posts={props.comments} level={1} handleAuth={props.handleAuth} addPost={props.addPost} cancelPost={props.cancelPost} deletePost={props.deletePost} editPost={props.editPost} editLikes={props.editLikes}/>
      </ul>
    </div>
  </div>
);

Comments.propTypes = {
  addPost: PropTypes.func.isRequired,
  cancelPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  editLikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  handleAuth: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  submitPost: PropTypes.func.isRequired,
};

export default Comments;

const CommentsContainer = props => (
  <div>
    {props.posts.length > 0 && props.posts.map((post, key) => {
      return (
        <div key={key}>
          <li>
            <div className={styles['comment-main-level']}>
              <Comment post={post} submitPost={props.submitPost} level={props.level} handleAuth={props.handleAuth} addPost={props.addPost} cancelPost={props.cancelPost} deletePost={props.deletePost} editPost={props.editPost} editLikes={props.editLikes}/>
            </div>
          </li>
          {post.children.length > 0 && (
            <ul className={`${styles['comments-list']} ${styles['reply-list']}`}>
              <CommentsContainer posts={post.children} submitPost={props.submitPost} level={2} handleAuth={props.handleAuth} addPost={props.addPost} cancelPost={props.cancelPost} deletePost={props.deletePost} editPost={props.editPost} editLikes={props.editLikes}/>
            </ul>
          )}
        </div>
      );
    })}
  </div>
);

CommentsContainer.propTypes = {
  addPost: PropTypes.func.isRequired,
  cancelPost: PropTypes.func.isRequired,
  editLikes: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  handleAuth: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  submitPost: PropTypes.func.isRequired,
};
