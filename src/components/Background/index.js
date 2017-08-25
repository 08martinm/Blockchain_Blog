import React from 'react';
import styles from './styles/background.css';

const Background = () => {
  return (
    <div className={styles.container}>
      <h1>What is this site about?</h1>
      <div className={styles.text}>
        <p>
          These are my scribbling about blockchain. 
          What it is, what it can do, and why we should care.
          While I hope to cover many facets of this technology,
          my goal is to provide an in-depth look from a developer&#39;s
          perspective. Over time, I intend to host live demos and cultivate
          reader feedback, so that you can participate in this site&#39;s
          creation and direction.
          <br /><br />
          Meanwhile, if you would like to be alerted when I publish
          new features, feel free to send me your email. I promise to
          respect your privacy and only notify you of substantive updates.
        </p>
        <div className={styles.center}>
          <form>
            <input type='text' placeholder='email address'/>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Background;
