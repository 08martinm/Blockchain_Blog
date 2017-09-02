import React from 'react';
import styles from '../styles/nav.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Nav = props => {
  let showNav = props.show ? styles.shownav : '';
  return (
    <div className={classnames(styles.nav, 'col-xs-12', showNav)}>
      <div className={styles.container}>
        <Link to='/' className={`${styles.back}`}>
          <i className={`${styles.arrow} fa fa-angle-double-left`} aria-hidden='true'></i>
          Home
        </Link>
      </div>
      <div className={styles.titlecontainer}>
        <h2 className={`${styles.title}`}>The Blockchain Blog</h2>
      </div>
    </div>
  );
};

Nav.propTypes = {
  show: PropTypes.bool.isRequired,
};


export default Nav;
