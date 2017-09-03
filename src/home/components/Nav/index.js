import React from 'react';
import PropTypes from 'prop-types';
import styles from './Nav.css';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const Nav = () => {
  const navList = ['Posts', 'Site', 'Author'];
  return (
    <div>
      <div className={`${styles.container}`}>
        <ul className={styles.ul}>
          {navList.map(item => <NavItem key={item} value={item} />)}
        </ul>
        <li className={classnames(styles.li, styles.right)}>
          <Link to='login' className={styles.a}>Login</Link>
        </li>
        <div className={styles['text-container']}>
          <h2 className={styles.title}>Teaching Blockchain</h2>
        </div>
      </div>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li className={styles.li}>
      <a href={'#' + props.value} className={styles.a}>{props.value}</a>
    </li>
  );
};

NavItem.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Nav;
