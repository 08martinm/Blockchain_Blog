import React from 'react';
import styles from './styles/blog.scss';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div id='Lessons' className={`row ${styles.container}`}>
      <div className={`${styles.semitransparent} col-lg-4 col-md-6 col-sm-8 col-xs-10 col-lg-offset-4 col-md-offset-3 col-sm-offset-2 col-xs-offset-1`}>
        <h1>Lessons</h1>
        <ul className={styles.list}>
          <li>
            <Link to='/lesson_1'><h3>Let&#39;s Start from the Beginning</h3></Link>
            <p>
              Dust off those critical reading skills and join me in taking an in-depth dive
              into the white paper that inspired the crypto-currency movement: 
              <b> Bitcoin: A Peer-To-Peer Electronic Cash System</b>. Read the primary source,
              my/other&#39;s annotations, then make your own.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Blog;
