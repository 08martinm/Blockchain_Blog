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
      forgotemail: '',
      confemail: '',
    };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.forgot = this.forgot.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signup(event) {
    event.preventDefault();
    let body = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confpassword: this.state.confpassword,
    };
    axios.post('/api/signup', body)
      .then(response => console.log(response));
  }

  login(event) {
    event.preventDefault();
    let body = {
      logemail: this.state.logemail,
      logpassword: this.state.logpassword,
    };
    axios.post('/api/login', body)
      .then(response => console.log(response));
  }

  forgot(event) {
    event.preventDefault();
    let body = {
      forgotemail: this.state.forgotemail,
      confemail: this.state.confemail,
    };
    axios.post('/api/forgot', body)
      .then(response => console.log(response));
  }

  handleChange(evt) {
    console.log(this.state[evt.target.id]);
    let newState = {};
    newState[evt.target.id] = evt.target.value;
    this.setState(newState);
  }

  changeView(event) {
    event.preventDefault();
    this.setState({view: event.target.id});
  }

  render() {
    let showView;
    switch (this.state.view) {
    case 'signup':
      showView = <CreateAcct handleSubmit={this.signup} handleChange={this.handleChange} vals={this.state}/>;
      break;
    case 'login':
      showView = <SignIn handleSubmit={this.login} handleChange={this.handleChange} changeView={e => this.changeView(e)} vals={this.state}/>;
      break;
    case 'forgot':
      showView = <Forgot handleSubmit={this.forgot} handleChange={this.handleChange} vals={this.state}/>;
      break;
    }

    return (
      <div className={`row ${styles.background}`}>
        <Nav show={true} signedin={this.state.signedin} />
        <div className={`${styles.container} col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4`}>
          <div id='signup' onClick={e => this.changeView(e)} className={`${styles.view}`}>Sign Up</div>
          <div id='login' onClick={e => this.changeView(e)} className={`${styles.view}`}>Login</div>
          <div className='col-xs-12'>
            {showView}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

const CreateAcct = props => (
  <form className={styles.forms} onSubmit={evt => props.handleSubmit(evt)}>
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
};

const SignIn = props => (
  <form className={styles.forms} onSubmit={evt => props.handleSubmit(evt)}>
    <h5 className='text-center'>Email<br/>(never made public)</h5>
    <input id='logemail' onChange={props.handleChange} value={props.vals.logemail} type='text' className={styles.input} placeholder='Email or Username' />
    <h5 className='text-center'>Password</h5>
    <input id='logpassword' onChange={props.handleChange} value={props.vals.logpassword} type='password' className={styles.input} placeholder='Password' />
    <p className={`text-center ${styles.forgotpw}`}>Forgot your password? <span id='forgot' onClick={props.changeView} className={styles.forgotlink}>Click here</span></p>
    <button className={styles.btn} type='submit'>Submit</button>
  </form>
);

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired,
};

const Forgot = props => (
  <form className={styles.forms} onSubmit={evt => {props.handleSubmit(evt);}}>
    <h5 className='text-center'>Email</h5>
    <input id='forgotemail' onChange={props.handleChange} value={props.vals.forgotemail} type='text' className={styles.input} placeholder='Email' />
    <h5 className='text-center'>Confirm Email</h5>
    <input id='confemail' onChange={props.handleChange} value={props.vals.confemail} type='text' className={styles.input} placeholder='Email' />
    <button className={styles.btn} type='submit'>Submit</button>
  </form>
);

Forgot.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  vals: PropTypes.object.isRequired,
};
