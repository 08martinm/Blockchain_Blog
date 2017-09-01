import React from 'react';
import PropTypes from 'prop-types';

const Comment = props => (
  <div>{props.val.comment}</div>
);

Comment.propTypes = {
  val: PropTypes.object.isRequired,
};

export default Comment;