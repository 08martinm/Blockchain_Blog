import React, {Component} from 'react';
import styles from '../styles/nav.scss';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import axios from 'axios';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout() {
    axios.get('/api/logout')
      .then(response => console.log(response));
  }

  render() {
    let showNav = this.props.show ? styles.shownav : '';
    return (
      <div className={classnames(styles.nav, 'col-xs-12', showNav)}>
        <div className={styles.container}>
          <Link to='/' className={`${styles.back}`}>
            <i className={`${styles.arrow} fa fa-angle-double-left`} aria-hidden='true'></i>
            Home
          </Link>
        </div>
        <div className={styles.titlecontainer}>
          <h2 className={`${styles.title}`}>Teaching Blockchain</h2>
        </div>
        {
          this.props.signedin ?
            <Link to='login' className={classnames(styles.back, styles.right)}>Sign In</Link> :
            <div onClick={this.signout.bind(this)} className={classnames(styles.back, styles.right)}>
              Sign Out
            </div>
        }
      </div>
    );
  }
}

Nav.propTypes = {
  show: PropTypes.bool.isRequired,
  signedin: PropTypes.bool.isRequired,
};

export default Nav;