import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comments.scss';
import {Link} from 'react-router-dom';
import AddPost from './AddPost.js';
import moment from 'moment';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      comment: '',
    };
    this.toggleEditable = this.toggleEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleEditable() {
    if (this.state.editable) {
      this.setState({editable: false});
    } else {
      this.setState({editable: true, comment: this.props.post.comment});
    }
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.id] = evt.target.value;
    this.setState(newState);    
  }

  render() {
    let flair = '', post = '';
    if (this.props.post.username === '08martinm') flair = 'by-author';
    if (this.props.post.username === this.props.handleAuth.username && this.props.post.username != null) flair = 'you';
    if (this.props.post.addPost) post = 'post';

    return (
      <div>
        <div className={`${styles['comment-box']} ${styles[post]}`}>
          <div className={`${styles['comment-head']} ${styles[post]}`}>
            <h6 className={`${styles['comment-name']} ${styles[flair]}`}><a>{this.props.post.username}</a></h6>
            <span>{!this.props.post.addPost && moment(this.props.post.create_date).fromNow()}</span>
            {!this.props.post.addPost && this.props.level === 1 && <i onClick={() => this.props.addPost(this.props.post._id)} className='fa fa-reply'></i>}
            {!this.props.post.addPost && <i onClick={() => this.props.editLikes(this.props.post._id)} className='fa fa-heart'></i>}
            {!this.props.post.addPost && <b>{this.props.post.likes}</b>}
            {this.props.post.addPost && <div className='text-center'>Add comment</div>}
          </div>
          <div className={styles['comment-content']}>
            {!this.props.post.addPost ? 
              !this.state.editable && this.props.post.comment :
              this.props.handleAuth.loggedin ? 
                <AddPost submitPost={this.props.submitPost} level={this.props.level} post={this.props.post} cancelPost={this.props.cancelPost}/> :
                (<div>
                  <div>To post a comment, please <Link to='/login'>sign in</Link>.</div>
                  <div className='text-center'>
                    {this.props.level != 1 && <button className='btn btn-warning' onClick={evt => this.props.cancelPost(evt, this.props.post.parent_id)}>Cancel</button>}
                  </div>
                </div>)
            }
            {this.props.handleAuth.loggedin && this.props.handleAuth.username === this.props.post.username && !this.state.editable &&
              (
                <div className='text-center'>
                  <button className='btn btn-xs btn-primary' onClick={this.toggleEditable}>Edit</button>
                  {this.props.level != 1 && <button className='btn btn-xs btn-primary' onClick={() => this.props.deletePost(this.props.post)}>Delete</button>}
                </div>
              )
            }
            {this.props.handleAuth.loggedin && this.props.handleAuth.username === this.props.post.username && this.state.editable &&
              (
                <div className='text-center'>
                  <textarea id='comment' onChange={this.handleChange} className='form-control' rows='4'>{this.state.comment}</textarea>
                  <button className='btn btn-xs btn-primary' onClick={() => {this.toggleEditable(); this.props.editPost({comment: this.state.comment, id: this.props.post._id});}}>Submit</button>
                  <button className='btn btn-xs btn-primary' onClick={this.toggleEditable}>Cancel</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  addPost: PropTypes.func.isRequired,
  cancelPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  editLikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  handleAuth: PropTypes.object.isRequired,
  submitPost: PropTypes.func.isRequired,
};

export default Comment;
