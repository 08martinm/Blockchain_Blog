import React, { Component } from 'react';
import styles from './styles/background.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validEmail: true,
      formValue: '',
      inputClass: 'unfocused',
      show: false,
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleChange(event) {
    let newVal = event.target.value;
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    this.setState({validEmail: re.test(newVal), formValue: newVal, inputClass: re.test(newVal) ? 'valid' : 'invalid'});
  }

  handleFocus() {
    this.setState({inputClass: 'focused'});
    this.setState({show: false});
  }

  handleBlur() {
    if (this.state.inputClass != 'submitted') {
      this.setState({inputClass: 'unfocused'});
    }
  }

  submitEmail(event) {
    this.setState({show: false, error: false});
    event.preventDefault();
    if (this.state.validEmail) {
      axios.post('/api/emails', {email: this.state.formValue})
        .then(() => this.setState({inputClass: 'submitted', show: true, error: false}))
        .catch(() => this.setState({inputClass: 'submitted', show: false, error: true}));
    } else {
      this.setState({inputClass: 'error'});
    }
  }

  render() {
    return (
      <div id='Site' className={`row ${styles.container}`}>
        <div className={styles.container1} />
        <div className='col-lg-4 col-md-6 col-sm-8 col-xs-10 col-xs-offset-1 col-sm-offset-3 col-md-offset-5 col-lg-offset-7'>
          <h1>What is this site about?</h1>
          <div className={`${styles.text}`}>
            <p>This site aims to achieve two goals:</p>
            <ol>
              <li>Teach users about blockchain: how it works, what it does, and why we should care.</li>
              <li>Form an online community dedicated to achieving Goal #1.</li>
            </ol>
            <p>
              In the spirit of the first goal, I will be working to provide amazing content that triggers
              lightbulb moments for all of you. However, I do have something to ask in return: <Link to='/login'>create an account</Link>,
              comment on <a href='#Lessons'>lessons</a>, and let your voice be heard. The second goal ultimately plays a much more significant
              role in making this site a value-add to our blockchain education.<br/>
              <br/>
              You&#39;re currently visiting this site in its infancy. For now, I suggest you
              take a look at the <Link to='/lesson_1'>Bitcoin Whitepaper provided in Lesson 1</Link>.
              If you&#39;d like to be alerted when I publish new lessons, feel free to sign up below.
            </p>
          </div>
          <div className={`${styles.center} `}>
            <form onSubmit={this.submitEmail.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)}>
              <input value={this.state.formValue} onChange={this.handleChange.bind(this)} placeholder='email address' className={styles[this.state.inputClass]} type='text'/>
              <button type='Submit' className={styles[this.state.inputClass]}>Submit</button>
            </form>
          </div>
          {this.state.error ? <div className={`alert alert-danger ${styles.alert}`}>Hmmm... we already have that email address on file. Do you want to try another one?</div> : ''}
          {this.state.show ? <div className={`alert alert-success ${styles.alert}`}>Awesome!<br/>One more step: please click on the validation link sent to your email to verify your account.</div> : ''}
        </div>
      </div>
    );
  }
}

export default Background;

const Instructions = props => {
  let cName = props.show ? 'show' : 'hide';
  return (
    <div className={styles[cName]}>
      Thank you for signing up!<br />
      {`An email was sent to ${props.email}.`}<br />
      Click on the confirmation link in the email to confirm your account.
    </div>
  );
};

Instructions.propTypes = {
  show: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};
