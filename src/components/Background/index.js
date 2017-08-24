import React from 'react';
import styles from './styles/styles.css';

const Background = () => {
  return (
    <div className={styles.div}>
      <div className={styles.text}>
        <h1>What is this site about?</h1>
        <p>
          These are my scribbling about blockchain. What it is. What it can do. And why we should care. 
          Over time, I hope to over time host live demos and cultivate reader feedback.
          <div className={styles.filler}></div>
        </p>
      </div>
    </div>
  );
};

export default Background;
