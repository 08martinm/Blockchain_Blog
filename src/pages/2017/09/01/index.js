import React, { Component } from 'react';
import styles from './styles/Post1.scss';
import WhitePaper from './components/WhitePaper';
import Comment from './components/Comment';
import Nav from './components/Nav';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Post1 extends Component {
  constructor() {
    super();
    this.state = {
      selected: '',
      posts: [],
      showNav: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(){
    let {showNav} = this.state;

    window.scrollY > this.prev ?
      showNav && this.setState({showNav: false}) :
      !showNav && this.setState({showNav: true});

    this.prev = window.scrollY;
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick(event) {
    event.stopPropagation();
    let newId = event.target.id === this.state.selected ? '' : event.target.id;
    this.setState({selected: newId});
    console.log('axios starting');
    axios.get('/api/posts?id=' + newId)
      .then(posts => { 
        console.log('posts are', posts);
        this.setState({posts: posts.data}); 
      })
      .catch(err => { console.log(err); });
  }

  render() {
    let expandView = this.state.showNav ? '' : styles.expand;
    return (
      <div className={`row ${styles.page}`}>
        <Nav show={this.state.showNav} />
        <div className={`${styles.whitepaper} col-xs-12 col-md-6`}>
          <WhitePaper onclick={this.handleClick.bind(this)} selected={this.state.selected} />
        </div>
        <div className={classnames('col-xs-12', 'col-md-6', styles.comments, expandView)}>
          {this.state.selected != '' ?
            <Comments title={this.state.selected} posts={this.state.posts} /> :
            <Instructions />
          }
        </div>
      </div>
    );
  }
}

let Instructions = () => (
  <div>
    <h3>Instructions</h3>
    <p>
      <br/>
      Hi and welcome to a community reading of the Satoshi White Paper.<br/>
      <br/>
      The purpose of this page is to complement a close reading of the primary source
      with community analysis. I suggest taking a moment to quickly read the entire
      white paper (don&#39;t worry it&#39;s not very long). Afterwards, click on the circles
      next to each paragraph to review community-sourced comments.<br/>
      <br/>
      If you&#39;d like to leave a comment or vote for one, please <a href=''>sign in</a>.
    </p>
  </div>
);

let Comments = props => (
  <div>
    <h3>{`${props.title}`}</h3>
    {props.posts.map((val, key) => <Comment key={key} val={val} />)}
  </div>
);

Comments.propTypes = {
  title: PropTypes.string.isrequired,
  posts: PropTypes.array.isRequired,
};

export default Post1;
