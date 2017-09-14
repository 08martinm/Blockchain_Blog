import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comments.scss';
import styles1 from '../styles/Lesson1.scss';
import Comment from './Comment.js';

const Comments = props => (
  <div>
    <h2 className='text-center'>Comments</h2>
    <h3 className='text-center'>{`${props.title}`}</h3>
    <div className={styles1.divider}/>
    <div className={styles['comments-container']}>
      <ul id={styles['comments-list']} className={styles['comments-list']}>
        <CommentsContainer posts={fakeComments}/>
      </ul>
    </div>
  </div>
);

Comments.propTypes = {
  title: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;

const CommentsContainer = props => (
  <div>
    {props.posts.map(post => {
      return (
        <div key={post._id}>
          <li>
            <div className={styles['comment-main-level']}>
              <Comment post={post} />
            </div>
          </li>
          {post.children.length > 0 && (
            <ul className={`${styles['comments-list']} ${styles['reply-list']}`}>
              <CommentsContainer posts={post.children} />
            </ul>
          )}
        </div>
      );
    })}
  </div>
);

CommentsContainer.propTypes = {
  posts: PropTypes.array.isRequired,
};

let fakeComments = [
  {
    _id: '59b9b4542094a424f0231412341b0c84',
    username: '08martinm',
    lesson_id: 'whitepaper_bitcoin',
    section_id: 'Title',
    parent_id: null,
    comment: 'Hi there',
    children: [
      {
        _id: '59b9b4542094a424f012134123b04443',
        username: '08mm',
        lesson_id: 'whitepaper_bitcoin',
        section_id: 'Title',
        parent_id: '59b9b4542094a424f01b0c84',
        comment: 'It will be important to note the historical context surrounding 10/31/2008 throughout this paper. The financial markets had been in turmoil for well over a year by this point. In January of 2008, Bank of America purchased Countrywide Financial for ~$4bn. In March of 2008, the Federal Reserve guaranteed $30bn of Bear Stearns assets under a government-sponsored sale to JPMorgan Chase. In September of 2008, AIG accepts an $85bn federal bailout, Goldman Sachs and Morgan Stanley convert from independent investment banks to bank holding companies, and federal regulators shut down Washington Mutual Bank. On September 29, 2008, congress rejected TARP, a $700bn financial rescue package, causing the Dow Jones to plummet 778 points, its single-worst drop ever. This paper was written at the height of distrust in banks and government institutions and devises an alternative: a purely peer-to-peer payment method that bypasses all 3rd parties.',
        children: [],
      },
      {
        _id: '59b9b4542094a424f04321341234114',
        username: 'Someon Else',
        lesson_id: 'whitepaper_bitcoin',
        section_id: 'Title',
        parent_id: '59b9b4542094a424f01b0c84',
        comment: 'Valid point, but I have something to tack on: blah, blah, blah',
        children: [],
      },
      {
        _id: '59b9b4542094a424f01b044423421433',
        username: 'Rando1',
        lesson_id: 'whitepaper_bitcoin',
        section_id: 'Title',
        parent_id: '59b9b4542094a424f0434114',
        comment: 'Well, I beg to differ! You see: blah, blah, blah',
        children: [],
      },  
    ],
  },
  {
    _id: '59b9b4542094a42123412344f0434114',
    username: 'Whos this',
    lesson_id: 'whitepaper_bitcoin',
    section_id: 'Title',
    parent_id: null,
    comment: 'This is a new comment - should appear on top-level',
    children: [
      {
        _id: '59b9b4542094a424f01b044213452',
        username: 'Rando2',
        lesson_id: 'whitepaper_bitcoin',
        section_id: 'Title',
        parent_id: '59b9b4542094a424f0434114',
        comment: 'Youre a genius! A genius I tell you!',
        children: [],
      },
    ],
  },
];
