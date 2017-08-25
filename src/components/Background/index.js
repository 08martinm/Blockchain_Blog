import React from 'react';
import styles from './styles/background.css';

const Background = () => {
  return (
    <div className={styles.container}>
      <h1>What is this site about?</h1>
      <div className={styles.text}>
        <p>
          These are my scribbling about blockchain. What it is, what it can do, and why we should care. 
          Over time, I hope to host live demos and cultivate reader feedback.
          <br /><br />
          Meanwhile, if you would like to be alerted whenever I publish a new feature,
          feel free to add your email. I promise to respect your privacy and only notify you of substantive updates.
        </p>
        <div className={styles.center}>
          <input type='text' placeholder='email address'/>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Background;
