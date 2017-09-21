import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Lesson1.scss';
import { Link } from 'react-router-dom';

const Instructions = props => (
  <div className={styles.comments}>
    <h3>Instructions</h3>
    <p>
      <br/>
      Hi and welcome to a community reading of the Satoshi White Paper.<br/>
      <br/>
      The purpose of this page is to complement a close reading of the primary source
      with community analysis. I suggest taking a moment to quickly read the entire
      white paper (don&#39;t worry, it&#39;s not very long). Afterwards, click on the circles
      next to each paragraph to review community-sourced comments.<br/>
      <br/>
    </p>
    {props.handleAuth.loggedin ?
      <p></p> :
      <p>If you&#39;d like to leave a comment or vote for one, please <Link to='login'>sign in</Link>.</p>
    }
  </div>
);

Instructions.propTypes = {
  handleAuth: PropTypes.object.isRequired,
};

export default Instructions;
