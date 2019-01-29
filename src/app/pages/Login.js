import React, { Component } from 'react'
import logo from '../../img/icon.png'

export default class Login extends Component {
  state = {
    login: false
  }

  nextForm = () => {
    this.setState({ login: !this.state.login })
  }

  render() {
    return (
      <div className="container login">
        <div className="login__container">
        <div className= "header">

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
              </div>
            }
            <input type="submit" value={this.state.login ? "Sign up" : "Login"} />
            <button className="next" onClick={this.nextForm}>{this.state.login ? "Login" : "Sign up"}</button>
          </form>
        </div>
      </div>
    )
  }
}
