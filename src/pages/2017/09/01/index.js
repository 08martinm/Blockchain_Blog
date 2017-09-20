import React, { Component } from 'react';
import styles from './styles/Lesson1.scss';
import WhitePaper from './components/WhitePaper';
import Comments from './components/Comments';
import Instructions from './components/Instructions';
import Nav from './components/Nav';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Lesson1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      comments: [],
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
      lesson_id: this.state.comments[0]['lesson_id'],
      section_id: this.state.comments[0]['section_id'],
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
          // /*FOR DEVELOPMENT*/this.setState({isLoading: false, comments: fakeComments});
        });
    }
  }

  render() {
    let expandView = this.state.showNav ? '' : styles.expand;

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
        <div className={`${styles.whitepaper} ${styles.scroll} col-xs-12 col-md-6`}>
          <WhitePaper onclick={this.handleClick.bind(this)} selected={this.state.selected} />
        </div>
        <div className={classnames('col-xs-12', 'col-md-6', styles.comments, expandView)}>
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

// let fakeComments = [
//   {
//     _id: '59b9b4542094a424f0231412341b0c84',
//     username: '08martinm',
//     lesson_id: 'whitepaper_bitcoin',
//     section_id: 'Title',
//     parent_id: null,
//     comment: 'Hi there',
//     likes: 7,
//   },
// ];
//       {
//         _id: '59b9b4542094a424f012134123b04443',
//         username: '08mm',
//         lesson_id: 'whitepaper_bitcoin',
//         section_id: 'Title',
//         parent_id: '59b9b4542094a424f01b0c84',
//         comment: 'It will be important to note the historical context surrounding 10/31/2008 throughout this paper. The financial markets had been in turmoil for well over a year by this point. In January of 2008, Bank of America purchased Countrywide Financial for ~$4bn. In March of 2008, the Federal Reserve guaranteed $30bn of Bear Stearns assets under a government-sponsored sale to JPMorgan Chase. In September of 2008, AIG accepts an $85bn federal bailout, Goldman Sachs and Morgan Stanley convert from independent investment banks to bank holding companies, and federal regulators shut down Washington Mutual Bank. On September 29, 2008, congress rejected TARP, a $700bn financial rescue package, causing the Dow Jones to plummet 778 points, its single-worst drop ever. This paper was written at the height of distrust in banks and government institutions and devises an alternative: a purely peer-to-peer payment method that bypasses all 3rd parties.',
//         likes: 14,
//         children: [],
//       },
//       {
//         _id: '59b9b4542094a424f04321341234114',
//         username: 'Someon Else',
//         lesson_id: 'whitepaper_bitcoin',
//         section_id: 'Title',
//         parent_id: '59b9b4542094a424f01b0c84',
//         comment: 'Valid point, but I have something to tack on: blah, blah, blah',
//         likes: 231,
//         children: [],
//       },
//       {
//         _id: '59b9b4542094a424f01b044423421433',
//         username: 'Rando1',
//         lesson_id: 'whitepaper_bitcoin',
//         section_id: 'Title',
//         parent_id: '59b9b4542094a424f0434114',
//         comment: 'Well, I beg to differ! You see: blah, blah, blah',
//         likes: 1,
//         children: [],
//       },  
//     ],
//   },
//   {
//     _id: '59b9b4542094a42123412344f0434114',
//     username: 'Whos this',
//     lesson_id: 'whitepaper_bitcoin',
//     section_id: 'Title',
//     parent_id: null,
//     comment: 'This is a new comment - should appear on top-level',
//     likes: 0,
//     children: [
//       {
//         _id: '59b9b4542094a424f01b044213452',
//         username: 'Rando2',
//         lesson_id: 'whitepaper_bitcoin',
//         section_id: 'Title',
//         parent_id: '59b9b4542094a424f0434114',
//         comment: 'Youre a genius! A genius I tell you!',
//         likes: 2,
//         children: [],
//       },
//     ],
//   },
//   {
//     _id: null,
//     username: null,
//     lesson_id: 'whitepaper_bitcoin',
//     section_id: 'Title',
//     parent_id: null,
//     addPost: true,
//     comment: null,
//     likes: 0,
//     children: [],
//   },
// ];

