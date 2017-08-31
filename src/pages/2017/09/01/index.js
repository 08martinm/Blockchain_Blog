import React, { Component } from 'react';
import styles from './styles/Post1.scss';
import WhitePaper from './components/WhitePaper';
import Comment from './components/Comment';
import axios from 'axios';

class Post1 extends Component {
  constructor() {
    super();
    this.state = {
      selected: 'id_1',
      posts: [],
    };
    this.handleClick = this.handleClick.bind(this);
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
    return (
      <div className={`row ${styles.page}`}>
        <div className='col-xs-12 col-md-6'>
          <WhitePaper onclick={this.handleClick.bind(this)} selected={this.state.selected} />
        </div>
        <div className={`'col-xs-12 col-md-6 ${styles.comments}`}>
          {this.state.posts.map((val, key) => <Comment key={key} val={val} />)}
        </div>
      </div>
    );
  }
}

export default Post1;
