import React, { Component } from 'react';
import styles from './styles/background.css';
import axios from 'axios';
import PropTypes from 'prop-types';

class Background extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validEmail: true,
      formValue: '',
      inputClass: 'unfocused',
      show: false,
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
    event.preventDefault();
    if (this.state.validEmail) {
      axios.post('/api/emails', {
        email: this.state.formValue,
      })
        .then(this.setState({inputClass: 'submitted'}))
        .then(this.setState({show: true}));
    } else {
      this.setState({inputClass: 'error'});
    }
  }

  render() {
    return (
      <div className={`row ${styles.container}`}>
        <div className={styles.container1} />
        <div className='col-lg-4 col-md-6 col-sm-8 col-xs-10 col-xs-offset-1 col-sm-offset-3 col-md-offset-5 col-lg-offset-7'>
          <h1>What is this site about?</h1>
          <div className={`${styles.text}`}>
            <p>
              These are my scribbling about blockchain. 
              What it is, what it can do, and why we should care.
              While I hope to cover many facets of this technology,
              my goal is to provide an in-depth look from a developer&#39;s
              perspective. Over time, I intend to host live demos and cultivate
              reader feedback, so that you can participate in this site&#39;s
              creation and direction.
              <br /><br />
              Meanwhile, if you would like to be alerted when I publish
              new features, feel free to send me your email. I promise to
              respect your privacy and only notify you of substantive updates.
            </p>
          </div>
          <div className={`${styles.center} `}>
            <form onSubmit={this.submitEmail.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)}>
              <input value={this.state.formValue} onChange={this.handleChange.bind(this)} placeholder='email address' className={styles[this.state.inputClass]} type='text'/>
              <button type='Submit' className={styles[this.state.inputClass]}>Submit</button>
            </form>
          </div>
          <Instructions show={this.state.show} email={this.state.formValue} />
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
