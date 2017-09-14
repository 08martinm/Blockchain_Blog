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
    axios.get('/api/comments?section_id=' + newId + '&lesson_id=whitepaper_bitcoin')
      .then(comments => { 
        console.log('comments are', comments);
        this.setState({comments: comments.data}); 
      })
      .catch(err => { console.log(JSON.stringify(err)); });
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
    {props.handleAuth.loggedin ?
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
    {fakeComments.map((post, key) => <Comment key={key} post={post} />)}
  </div>
);

Comments.propTypes = {
  title: PropTypes.string.isrequired,
  comments: PropTypes.array.isRequired,
};

export default Lesson1;

let fakeComments = [
  {
    username: '08martinm',
    lesson_id: 'whitepaper_bitcoin',
    section_id: 'Title',
    comment: 'Hi there',
  },
  {
    username: '08martinm',
    lesson_id: 'whitepaper_bitcoin',
    section_id: 'Title',
    comment: 'It will be important to note the historical context surrounding 10/31/2008 throughout this paper. The financial markets had been in turmoil for well over a year by this point. In January of 2008, Bank of America purchased Countrywide Financial for ~$4bn. In March of 2008, the Federal Reserve guaranteed $30bn of Bear Stearns assets under a government-sponsored sale to JPMorgan Chase. In September of 2008, AIG accepts an $85bn federal bailout, Goldman Sachs and Morgan Stanley convert from independent investment banks to bank holding companies, and federal regulators shut down Washington Mutual Bank. On September 29, 2008, congress rejected TARP, a $700bn financial rescue package, causing the Dow Jones to plummet 778 points, its single-worst drop ever. This paper was written at the height of distrust in banks and government institutions and devises an alternative: a purely peer-to-peer payment method that bypasses all 3rd parties.',
  },
  {
    username: '08martinm',
    lesson_id: 'whitepaper_bitcoin',
    section_id: 'Title',
    comment: 'From the title alone, we are able to get to the gist of Bitcoin - a means of providing the benefits of cash transactions online.',
  },
];