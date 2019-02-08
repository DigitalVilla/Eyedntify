import React, { Component } from 'react';
import logo from '../../img/icon.png';
import { capsWord } from '../redux/utils/utils';
import { connect } from 'react-redux';
import { validateUser } from '../redux/actions/act_authorize'
import { withRouter } from 'react-router-dom';

import classnames from 'classnames'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: true,
      hasRegistered: false,
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }
  }

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user.ok)
    return this.resetState(true);
 
    if (nextProps.auth.isAuthenticated)
      return this.props.history.push('/home');

      
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, hasRegistered: false});
    }

  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  submitForm = (e) => {
    e.preventDefault();
    const payload = this.state.login ? {
      login: this.state.username.toLowerCase(),
      password: this.state.password
    } : {
        username: this.state.username.toLowerCase(),
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      }

    this.props.validateUser(payload, this.state.login);
  }

  nextForm = (e) => {
    e.preventDefault();
    this.resetState();
  }

resetState = (login) => {
  this.setState({
    login: login || !this.state.login,
    hasRegistered: login || false,
    password2: '',
    password: '',
    email: '',
    errors: {}
  })
}

  resetPass = (e) => {
    e.preventDefault();
    // this.setState({ login: !this.state.login })
  }

  render() {
    const { errors } = this.state;

    return (<div className="container login">
      <div className="login__container">
        <div className="header">
          <img src={logo} alt="logo" />
          <h1> Eyedntify</h1>
        </div>
        <form onSubmit={this.submitForm} className="loginForm">
          {this.state.hasRegistered &&
            <h2 className="welcome">Welcome {this.state.username}!</h2>
          }
          <Input value="username" login={this.state.login} state={this.state} onChange={this.onChange} errors={errors} />
          <Input value="password" state={this.state} onChange={this.onChange} errors={errors} />
          {!this.state.login &&
            <React.Fragment>
              <Input value="password2" state={this.state} onChange={this.onChange} errors={errors} />
              <Input value="email" state={this.state} onChange={this.onChange} errors={errors} />
            </React.Fragment>
          }
          <button className="loginBtn" type="submit">
          {this.state.login ? "Login" : "Sign up"} 
          </button>
          <div className="links">
            {this.state.login && !this.state.hasRegistered &&
              <button className="next" onClick={this.resetPass}>Password?</button>}
            {!this.state.hasRegistered &&
              <button className="next" onClick={this.nextForm}>{this.state.login ? "Sign up!" : "Login!"}</button>
            }
          </div>
        </form>
      </div>
    </div>)
  }
}

function Input({ onChange, value, state, errors, login }) {
  return (
    <React.Fragment>
      <input
        onChange={onChange}
        value={state[value]}
        maxLength={value === "email" ? "50" : "20"}
        className={classnames("loginInput",
        { "isInvalid": errors[value] || (value === "username" && errors.login) })}
        name={value} type={value.indexOf('pass') > -1 ? 'password' : 'text'}
        placeholder={login ? "Username or Email" : value === "password2" ? "Repeat password" : capsWord(value)} />
      {(errors[value] || (value === "username" && errors.login)) &&
        <div className="errMsg">{errors[value] || errors.login} </div>
      }
    </React.Fragment>
  )
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { validateUser })(withRouter(Login));