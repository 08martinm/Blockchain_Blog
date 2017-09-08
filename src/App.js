import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Proptypes from 'prop-types';
import Home from './home';
import Verify from './pages/verify';
import Lesson1 from './pages/2017/09/01';
import Login from './pages/login';
import Profile from './pages/profile';
import styles from './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {loggedin: false};
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.auth = this.auth.bind(this);
  }

  login() {this.setState({loggedin: true});}
  logout() {this.setState({loggedin: false});}
  auth() {return this.state.loggedin;}

  // Initializes whether user is loggedin
  componentWillMount() {
    let self = this;
    axios.get('/api/loggedin')
      .then(() => self.setState({loggedin: true}))
      .catch(() => self.setState({loggedin: false}));
  }

  render() {
    let handleAuth = {
      auth: this.auth,
      login: this.login,
      logout: this.logout,
    };
    return (
      <Router>
        <div className={`container-fluid ${styles.base}`}>
          <Switch>
            <RouteWithAuth exact path='/' component={Home} handleAuth={handleAuth}/>
            <Route path="/verified" component={Verify} />
            <RouteWithAuth path='/lesson_1' component={Lesson1} handleAuth={handleAuth}/>
            <RouteWithAuth path='/login' component={Login} handleAuth={handleAuth}/>
            <PrivateRoute path='/profile' component={Profile} auth={this.auth}/>
            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, auth: Auth, ...rest }) => (
  <Route {...rest} render={props => (
    Auth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
    )
  )}/>
);

PrivateRoute.propTypes = {
  component: Proptypes.oneOfType([Proptypes.object, Proptypes.func]).isRequired,
  location: Proptypes.object,
  auth: Proptypes.func.isRequired,
};

const RouteWithAuth = ({component: Component, handleAuth: handleAuth, ...rest}) => (
  <Route {...rest} render={props => {
    return <Component handleAuth={handleAuth} {...props}/>;}
  } />
);

RouteWithAuth.propTypes = {
  component: Proptypes.oneOfType([Proptypes.object, Proptypes.func]).isRequired,
  handleAuth: Proptypes.object.isRequired,
};

export default App;
