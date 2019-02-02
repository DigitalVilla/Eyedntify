import React, { Component } from 'react'
import logo from '../../img/icon.png'
import { Consumer } from '../Context'

export default class Login extends Component {
  state = {
    login: false,
    recover: false
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.login) {
      //login
    } else {
      //register
    }
  }

  nextForm = (e) => {
    e.preventDefault();
    this.setState({ login: !this.state.login })
  }

  render() {
    return (
      <Consumer>
        {value => {
          return (<div className="container login">
            <div className="login__container">
              <div className="header">
                <img src={logo} alt="logo" />
                <h1> Eyedentify</h1>
              </div>
              <form action="">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                {this.state.login &&
                  <div>
                    <input type="password" placeholder="Confirm Password" />
                    <input type="email" placeholder="Email" />
                    {/* <input type="checkbox" value={this.state.login ? "Sign up" : "Login"} /> */}
                  </div>
                }
                <input type="submit" onClick={this.submitForm} value={this.state.login ? "Sign up" : "Login"} />
                <div className="links">
                  {!this.state.login &&
                    <button className="next" onClick={this.recover}>Password?</button>
                  }
                  <button className="next" onClick={this.nextForm}>{this.state.login ? "Login!" : "Sign up!"}</button>
                </div>
              </form>
            </div>
          </div>)
        }}
      </Consumer>
    )
  }
}
