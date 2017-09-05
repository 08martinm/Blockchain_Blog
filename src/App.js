import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './home';
import Verify from './pages/verify';
import Post1 from './pages/2017/09/01';
import Login from './pages/login';
import styles from './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
    };
    this.loginout = this.loginout.bind(this);
  }

  loginout() {
    this.setState({loggedin: !this.state.loggedin});
  }

  render() {
    return (
      <Router>
        <div className={`container-fluid ${styles.base}`}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/verified" component={Verify} />
            <Route path='/lesson_1' component={Post1} />
            <Route path='/login' component={Login} />
            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
