import React, { Component } from 'react';
import logo from '../../img/icon.png';
import { capsWord } from '../redux/utils/utils';
import { connect } from 'react-redux';
import { validateUser } from '../redux/actions/act_authorize'
import { withRouter } from 'react-router-dom';
import { updateProfile } from '../redux/actions/act_profile'
import classnames from 'classnames'
import Spinner from "../components/Spinner";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: true,
      hasRegistered: false,
      spinning: false,
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);

    if (nextProps.auth.isAuthenticated) {
      return this.props.history.push(this.state.hasRegistered ? '/profile' : '/home');
    }
    else if (nextProps.auth.user.ok) {
      this.setState(() => ({ spinning: false }));
      setTimeout(() => {
        return this.resetState(true);
      }, 400)
    }
    else if (nextProps.errors.errors) {
      this.setState(() => ({ spinning: false }));
      setTimeout(() => {
        this.setState(() => ({ errors: nextProps.errors.errors, hasRegistered: false }));
      }, 400)
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

    this.setState(() => ({ spinning: true, errors: {} }));
    setTimeout(() => {
      this.props.validateUser(payload, this.state.login);
    }, 500)
  }

  nextForm = (e) => {
    e.preventDefault();
    this.resetState();
  }

  resetState = (login) => {
    this.setState((state) => ({
      login: login || !state.login,
      hasRegistered: login || false,
      spinning: false,
      password2: '',
      password: '',
      email: '',
      errors: {}
    }))
  }

  resetPass = (e) => { // to be implementes
    e.preventDefault();
    // this.setState({ login: !this.state.login })
  }

  render() {
    const { login, errors, spinning, username, hasRegistered } = this.state;
    return (<div className="container login">
      <div className="login__container">
        <div className="header">
          <img src={logo} alt="logo" />
          <h1> Eyedntify</h1>
        </div>
        <form onSubmit={this.submitForm} className="loginForm">
          {this.state.hasRegistered &&
            <h2 className="welcome">Welcome {username}!</h2>
          }
          <Input value="username" login={login} state={this.state} onChange={this.onChange} errors={errors} />
          <Input value="password" state={this.state} onChange={this.onChange} errors={errors} />
          {!login &&
            <React.Fragment>
              <Input value="password2" state={this.state} onChange={this.onChange} errors={errors} />
              <Input value="email" state={this.state} onChange={this.onChange} errors={errors} />
            </React.Fragment>
          }
          <button className="loginBtn" type="submit">
            {login ? "Login" : "Sign up"}
          </button>
          <div className="links">
            {login && !hasRegistered &&
              <button className="next" onClick={this.resetPass}>Password?</button>}
            {!hasRegistered &&
              <button className="next" onClick={this.nextForm}>{login ? "Sign up!" : "Login!"}</button>
            }
          </div>
        </form>
        <Spinner spinning={spinning} />
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
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { validateUser, updateProfile })(withRouter(Login));