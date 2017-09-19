import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comment.scss';

const AddPost = () => (
  <div>
    <textarea className='form-control' rows='4'></textarea>
    <div className={`text-center ${styles.btncontainer}`}>
      <button className='btn btn-primary' type='submit'>Post Comment</button>
      <button className='btn btn-warning' type='submit'>Cancel</button>
    </div>
  </div>
);

AddPost.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddPost;