import React, { Component } from 'react';
import styles from './styles/Post1.scss';
import WhitePaper from './components/WhitePaper';
import Comment from './components/Comment';
import Nav from './components/Nav';
import axios from 'axios';
import classnames from 'classnames';

let instructions = `Hi, and welcome to an in-depth reading of
  the Satoshi White Paper. The purpose of this page is to encourage a
  close read of the primary source along with community-driven opinion
  and analysis. I suggest taking a moment to quickly read the entire
  white paper (don't worry it's not very long). Afterwards, click on the circles
  next to each paragraph to review community-sourced comments.`;
let signIn = 'If you\'d like to leave a comment, please sign in.';

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
            this.state.posts.map((val, key) => <Comment key={key} val={val} />) :
            (<div><p>{instructions}</p><br /><br /><p>{signIn}</p></div>)
          }
        </div>
      </div>
    );
  }
}

export default Post1;
