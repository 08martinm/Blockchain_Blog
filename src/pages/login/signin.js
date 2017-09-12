import React from 'react';
import styles from './login.scss';
import PropTypes from 'prop-types';

const SignIn = props => (
  <form className={styles.forms} onSubmit={evt => props.handleSubmit(evt)}>
    <div className='form-group'>
      <label htmlFor='email'>Email address</label>
      <input
        id='logemail'
        type='email'
        onChange={props.handleChange}
        value={props.vals.email}
        className='form-control' aria
        describedby='email'
        placeholder='Enter email'
      />
    </div>

    <div className='form-group'>
      <label htmlFor='password'>Password</label>
      <input
        id='logpassword'
        type='password'
        onChange={props.handleChange}
        value={props.vals.password}
        className='form-control'
        placeholder='Password'
      />
      <small id='logpasswordHelp' className='form-text text-muted'>
        Forgot your password?<br />
        If so, 
        <a id='forgot' onClick={props.changeView}> click here</a>.
      </small>
    </div>

    <button
      className={`btn btn-lg btn-primary center-block ${styles.newbtn}`}
      type='submit'>
      Login
    </button>
  </form>
);

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default SignIn;
