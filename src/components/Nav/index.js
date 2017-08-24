import React from 'react';
import PropTypes from 'prop-types';
import styles from './Nav.css';

const Nav = () => {
  const navList = ['Home', 'Background', 'Explanation'];
  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {navList.map((item, index) => <NavItem key={index} value={item} />)}
      </ul>
      <div className={styles['text-container']}>
        <h1 className={styles.title}>Blockchain.</h1>
      </div>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li className={styles.li}>
      <a className={styles.a}>{props.value}</a>
    </li>
  );
};

NavItem.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Nav;
