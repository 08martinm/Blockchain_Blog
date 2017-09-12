import React, {Component} from 'react';
import styles from '../login/login.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confpassword: '',
      showErr: false,
      showSuccess: false,
      showSpinner: false,
    };
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  reset(event) {
    event.preventDefault();
    this.setState({showSpinner: true});
    let body = {
      password: this.state.password,
      confpassword: this.state.confpassword,
    };
    axios.post('/api/reset/' + this.props.location.pathname.split('/')[2], body)
      .then(() => this.setState({showSuccess: true, showErr: false, showSpinner: false}))
      .catch(() => this.setState({showSuccess: false, showErr: true, showSpinner: false}));
  }

  handleChange(evt) {
    console.log(this.state[evt.target.id]);
    let newState = {};
    newState[evt.target.id] = evt.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className={`row ${styles.background}`}>
        <div className={`${styles.container} col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4`}>
          <div className='col-xs-12'>
            <ResetPw handleSubmit={this.reset} handleChange={this.handleChange} vals={this.state}/>
            {this.state.showErr ? <ErrMsg /> : ''}
            {this.state.showSuccess ? <SuccessMsg /> : ''}
            {this.state.showSpinner ? <Spinner /> : ''}
          </div>
        </div>
      </div>
    );
  }
}

Reset.propTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

export default Reset;

const ResetPw = props => (
  <form className={styles.forms} onSubmit={props.handleSubmit}>
    <h5 className='text-center'>Password</h5>
    <input id='password' onChange={props.handleChange} value={props.vals.password} type='password' className={styles.input} placeholder='Password' />
    <h5 className='text-center'>Confirm Password</h5>
    <input id='confpassword' onChange={props.handleChange} value={props.vals.confpassword} type='password' className={styles.input} placeholder='Password (must match)' />
    <button className={styles.btn} type='submit'>Submit</button>
  </form>
);

ResetPw.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
};

const ErrMsg = () => (
  <div className='text-center'>
    Password reset attempt failed. You may only submit this form from the link provided to you by email.
    If that link is not working, please get a new password reset email from the Forgot Password section of the 
    <Link to='/login' > login page</Link>.
  </div>
);

const SuccessMsg = () => (
  <div className='text-center'>
    Password successfully reset! Please sign in from the <Link to='/' >login page</Link>.
  </div>
);

const Spinner = () => (
  <div className='text-center'>FAKE SPINNER!!!</div>
);
