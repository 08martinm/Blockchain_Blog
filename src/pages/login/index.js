import React, {Component} from 'react';
import styles from './login.scss';
import Nav from '../2017/09/01/components/Nav';
import PropTypes from 'prop-types';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      view: 'signup',
      email: '',
      username: '',
      password: '',
      confpassword: '',
      logemail: '',
      logpassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event, view) {
    event.preventDefault();

    let body = (view === 'signup') ?
      {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        confpassword: this.state.confpassword,
      } :
      {
        logemail: this.state.logemail,
        logpassword: this.state.logpassword,
      };

    axios.post('/api/login', body)
      .then(response => console.log(response));
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.id] = evt.target.value;
    this.setState(newState);
  }

  changeView(event) {
    event.preventDefault();
    this.setState({view: event.target.id});
  }

  render() {
    return (
      <div className={`row ${styles.background}`}>
        <Nav show={true} signedin={this.state.signedin} />
        <div className={`${styles.container} col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4`}>
          <div id='signup' onClick={this.changeView.bind(this)} className={`${styles.view}`}>Sign Up</div>
          <div id='login' onClick={this.changeView.bind(this)} className={`${styles.view}`}>Login</div>
          <div className='col-xs-12'>
            {(this.state.view === 'signup') ? 
              <CreateAcct handleSubmit={this.handleSubmit} view={this.state.view} handleChange={this.handleChange.bind(this)} vals={this.state}/> :
              <SignIn handleSubmit={this.handleSubmit.bind(this)} view={this.state.view} handleChange={this.handleChange.bind(this)} vals={this.state}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

const CreateAcct = props => (
  <form className={styles.forms} onSubmit={evt => props.handleSubmit(evt, props.view)}>
    <h5 className='text-center'>Email<br/>(never made public)</h5>
    <input id='email' onChange={props.handleChange} value={props.vals.email} type='text' className={styles.input} placeholder='Email' />
    <h5 className='text-center'>Username</h5>
    <input id='username' onChange={props.handleChange} value={props.vals.username} type='text' className={styles.input} placeholder='Username' />
    <h5 className='text-center'>Password</h5>
    <input id='password' onChange={props.handleChange} value={props.vals.password} type='password' className={styles.input} placeholder='Password' />
    <h5 className='text-center'>Confirm Password</h5>
    <input id='confpassword' onChange={props.handleChange} value={props.vals.confpassword} type='password' className={styles.input} placeholder='Confirm Password' />
    <button className={styles.btn} type='submit'>Submit</button>
  </form>
);

CreateAcct.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
};

const SignIn = props => (
  <form className={styles.forms} onSubmit={evt => props.handleSubmit(evt, props.view)}>
    <h5 className='text-center'>Email or Username<br/>(Email never made public)</h5>
    <input id='logemail' onChange={props.handleChange} value={props.vals.logemail} type='text' className={styles.input} placeholder='Email or Username' />
    <h5 className='text-center'>Password</h5>
    <input id='logpassword' onChange={props.handleChange} value={props.vals.logpassword} type='password' className={styles.input} placeholder='Password' />
    <button className={styles.btn} type='submit'>Submit</button>
  </form>
);

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
};