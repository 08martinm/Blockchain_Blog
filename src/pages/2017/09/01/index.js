import React, { Component } from 'react';
import styles from './styles/Lesson1.scss';
import WhitePaper from './components/WhitePaper';
import Comments from './components/Comments';
import Instructions from './components/Instructions';
import Nav from './components/Nav';
import axios from 'axios';
import PropTypes from 'prop-types';

class Lesson1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      comments: [],
      lesson_id: 'whitepaper_bitcoin',
      showNav: true,
      isLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.addPost = this.addPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.editLikes = this.editLikes.bind(this);
  }

  deletePost(post) {
    axios.delete('/api/comments/' + post._id)
      .then(() => this.handleClick({target: {id: this.state.selected}}, 'fromSubmit'))
      .catch(err => console.log(JSON.stringify(err)));
  }

  editPost(comment) {
    axios.put('/api/comments', comment)
      .then(() => this.handleClick({target: {id: this.state.selected}}, 'fromSubmit'))
      .catch(err => console.log(JSON.stringify(err)));
  }  

  submitPost(evt, form) {
    evt.preventDefault();

    let data = {
      lesson_id: this.state.lesson_id,
      section_id: this.state.selected,
      parent_id: form.parent_id,
      comment: form.comment,
    };

    axios.post('/api/comments', data)
      .then(() => this.handleClick({target: {id: this.state.selected}}, 'fromSubmit'))
      .catch(err => console.log(JSON.stringify(err)));
  }

  addPost(id) {
    let comments = this.state.comments.slice();
    let clickedComment = comments.find(comment => comment._id === id);
    let hasInputAlready = clickedComment.children.find(comment => comment.addPost) + 1;
    if (!hasInputAlready) {
      clickedComment.children.push({likes: 0, addPost: true, parent_id: clickedComment._id, children: []});
      this.setState({comments: comments});
    }
  }

  cancelPost(evt, id) {
    evt.preventDefault();
    let comments = this.state.comments.slice();
    let clickedComment = comments.find(comment => comment._id === id);
    clickedComment.children.splice(clickedComment.children.findIndex(comment => comment.addPost), 1);
    this.setState({comments: comments});
  }

  editLikes(id) {
    axios.put('/api/likes', {id: id})
      .then(() => this.handleClick({target: {id: this.state.selected}}, 'fromSubmit'))
      .catch(err => console.log(JSON.stringify(err)));
  }

  handleClick(event, override) {
    if (override != 'fromSubmit' && event.target.id === this.state.selected) {
      this.setState({isLoading: false, selected: '', comments: []});
    } else {
      let self = this;
      if (override == 'fromSubmit') {
        this.setState({isLoading: true, comments: []});
      } else {
        this.setState({isLoading: true, selected: event.target.id, comments: []});
      }
      axios.get('/api/comments?section_id=' + event.target.id + '&lesson_id=whitepaper_bitcoin')
        .then(comments => { 
          let sortedComments = [];
          comments.data.forEach(val => {
            if (!val.parent_id) {
              sortedComments.push(val);
            } else {
              let parent = sortedComments.find(curr => curr._id.toString() === val.parent_id.toString());
              if (!parent.children) parent.children = [];
              parent.children.push(val);
            }
          });
          sortedComments.push({likes: 0, addPost: true, parent_id: null, children: []});
          self.setState({comments: sortedComments, isLoading: false});
          return 'Success!';
        })
        .catch(err => { 
          console.log('err in bitcoin_whitepaper index', JSON.stringify(err));
        });
    }
  }

  render() {
    let showView;
    if (this.state.selected === '') {
      showView = <Instructions handleAuth={this.props.handleAuth} />;
    } else if (this.state.isLoading) {
      showView = <i className={`${styles.loading} text-center fa-spin fa fa-cog`} aria-hidden='true'></i>;
    } else {
      showView = <Comments title={this.state.selected} submitPost={this.submitPost} handleAuth={this.props.handleAuth} comments={this.state.comments} addPost={this.addPost} cancelPost={this.cancelPost} deletePost={this.deletePost} editPost={this.editPost} editLikes={this.editLikes}/>;
    }

    return (
      <div className={`row ${styles.page}`}>
        <Nav show={this.state.showNav} handleAuth={this.props.handleAuth} />
        <div className={`${styles.whitepaper}`}>
          <WhitePaper onclick={this.handleClick.bind(this)} selected={this.state.selected} />
        </div>
        <div>
          {showView}
        </div>
      </div>
    );
  }
}

Lesson1.propTypes = {
  handleAuth: PropTypes.object.isRequired,
};

export default Lesson1;
