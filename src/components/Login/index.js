import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
  }

  submitFormSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFormFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const stringifiedDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(stringifiedDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.submitFormSuccess(data.jwt_token)
    } else {
      this.submitFormFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showSubmitError, errorMsg, password, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.submitForm} encType="multipart/form-data">
            <div className="input-container">
              <label className="label-element" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-element"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="USERNAME"
              />
            </div>
            <div className="input-container">
              <label className="label-element" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="PASSWORD"
                className="input-element"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            {showSubmitError ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
