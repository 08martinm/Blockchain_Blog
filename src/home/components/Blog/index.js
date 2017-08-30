import React from 'react';
import styles from './styles/blog.scss';
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className={`row ${styles.container}`}>
      <div className='col-lg-4 col-md-6 col-sm-8 col-xs-10 col-lg-offset-4 col-md-offset-3 col-sm-offset-2 col-xs-offset-1'>
        <h1>Blog Posts</h1>
        <ul className={styles.list}>
          <li>
            <Link to='/2017/09/01'><h3>No Better Place to Start Than from the Beginning.</h3></Link>
            <p>
              Dusting off those critical reading skills to take an in-depth dive
              into the White Paper that inspired the crypto-currency movement:<br />
              <a href='https://bitcoin.org/bitcoin.pdf'>Bitcoin: A Peer-To-Peer Electronic Cash System</a>.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Blog;
