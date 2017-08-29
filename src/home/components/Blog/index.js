import React from 'react';
import styles from './styles/blog.scss';

const Blog = () => {
  return (
    <div className={`row ${styles.container}`}>
      <h1>Blog Posts</h1>
      <ul className={styles.list}>
        <li><a>A Basic Primer</a></li>
      </ul>
    </div>
  );
};

export default Blog;
