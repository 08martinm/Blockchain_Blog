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
      .catch(() => { console.log('err in bitcoin_whitepaper index'); });
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

export default Lesson1;
