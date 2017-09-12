import React from 'react';
import styles from './login.scss';
import PropTypes from 'prop-types';

const SignUp = props => (
  <form className={styles.forms} onSubmit={evt => props.handleSubmit(evt)}>
    <div className='form-group'>
      <label htmlFor='email'>Email address</label>
      <input
        id='email'
        type='email'
        onChange={props.handleChange}
        value={props.vals.email}
        className='form-control'
        aria-describedby='email'
        placeholder='Enter email'
      />
      <small id='emailHelp' className='form-text text-muted'>
        We&#39;ll never share your email with anyone else.<br />
        You&#39;ll use this email to sign-in and recover passwords.
      </small>
    </div>

    <div className='form-group'>
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        type='text'
        onChange={props.handleChange}
        value={props.vals.username}
        className='form-control'
        placeholder='Enter desired username'
      />
      <small id='usernameHelp' className='form-text text-muted'>
        This will be your public handle ... choose wisely!
      </small>
    </div>

    <div className='form-group'>
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        onChange={props.handleChange}
        value={props.vals.password}
        className='form-control'
        placeholder='Password'
      />
      <small id='passwordHelp' className='form-text text-muted'>
        Requirements:
        <ul>
          <li>Greater than 6 characters.</li>
          <li>At least one capital letter.</li>
          <li>At least one lowercase letter.</li>
        </ul>
      </small>
    </div>

    <div className='form-group'>
      <label htmlFor='confpassword'>Password</label>
      <input
        id='confpassword'
        type='password'
        onChange={props.handleChange}
        value={props.vals.confpassword}
        className='form-control'
        placeholder='Confirm Password'
      />
    </div>
    
    <button
      className={`btn btn-lg btn-primary center-block ${styles.newbtn}`}
      type='submit'>
      Sign Up
    </button>
  </form>
);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
};

export default SignUp;
