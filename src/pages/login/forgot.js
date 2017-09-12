import React from 'react';
import styles from './login.scss';
import PropTypes from 'prop-types';

const Forgot = props => (
  <form className={styles.forms} onSubmit={evt => props.handleSubmit(evt)}>
    <div className='form-group'>
      <label htmlFor='email'>Email address</label>
      <input
        id='forgotemail'
        type='email'
        onChange={props.handleChange}
        value={props.vals.email}
        className='form-control' aria
        describedby='email'
        placeholder='Enter email'
      />
    </div>

    <div className='form-group'>
      <label htmlFor='password'>Confirm Email Address</label>
      <input
        id='confemail'
        type='email'
        onChange={props.handleChange}
        value={props.vals.email}
        className='form-control' aria
        describedby='email'
        placeholder='Re-enter email'
      />
      <small id='logpasswordHelp' className='form-text text-muted'>
        Don&#39;t want to reset your password?<br />
        <a id='login' onClick={props.changeView}>Click here</a> to go back.
      </small>
    </div>

    <button
      className={`btn btn-lg btn-primary center-block ${styles.newbtn}`}
      type='submit'>
      Reset Password
    </button>
  </form>
);

Forgot.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default Forgot;
