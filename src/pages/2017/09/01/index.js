import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Lesson1.scss';
import WhitePaper from './components/WhitePaper';
import Comment from './components/Comment';
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
    axios.get('/api/comments?id=' + newId)
      .then(comments => { 
        console.log('comments are', comments);
        this.setState({comments: comments.data}); 
      })
      .catch(err => { console.log(err); });
  }

  render() {
    let expandView = this.state.showNav ? '' : styles.expand;
    return (
      <div className={`row ${styles.page}`}>
        <Nav show={this.state.showNav} handleAuth={this.props.handleAuth} />
        <div className={`${styles.whitepaper} col-xs-12 col-md-6`}>
          <WhitePaper onclick={this.handleClick.bind(this)} selected={this.state.selected} />
        </div>
        <div className={classnames('col-xs-12', 'col-md-6', styles.comments, expandView)}>
          {this.state.selected != '' ?
            <Comments title={this.state.selected} comments={this.state.comments} /> :
            <Instructions handleAuth={this.props.handleAuth} />
          }
        </div>
      </div>
    );
  }
}

Lesson1.propTypes = {
  handleAuth: PropTypes.object.isRequired,
};

let Instructions = props => (
  <div>
    <h3>Instructions</h3>
    <p>
      <br/>
      Hi and welcome to a community reading of the Satoshi White Paper.<br/>
      <br/>
      The purpose of this page is to complement a close reading of the primary source
      with community analysis. I suggest taking a moment to quickly read the entire
      white paper (don&#39;t worry, it&#39;s not very long). Afterwards, click on the circles
      next to each paragraph to review community-sourced comments.<br/>
      <br/>
    </p>
    {props.handleAuth.auth() ?
      <p></p> :
      <p>If you&#39;d like to leave a comment or vote for one, please <Link to='login'>sign in</Link>.</p>
    }
  </div>
);

Instructions.propTypes = {
  handleAuth: PropTypes.object.isRequired,
};

let Comments = props => (
  <div>
    <h2 className='text-center'>Comments</h2>
    <h3 className='text-center'>{`${props.title}`}</h3>
    <div className={styles.divider}/>
    {props.comments.map((val, key) => <Comment key={key} val={val} />)}
  </div>
);

Comments.propTypes = {
  title: PropTypes.string.isrequired,
  comments: PropTypes.array.isRequired,
};

export default Lesson1;
