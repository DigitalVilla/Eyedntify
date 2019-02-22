import React, { Component } from 'react'
import Navbar from './navbar';
import Loading from './Loading'
import { connect } from 'react-redux';
import { deleteToken, validateToken } from '../redux/actions/act_authorize'
import { hasLoaded, isLoading, startSpin, stopSpin } from '../redux/actions/act_loader'
import Spinner from "../components/Spinner";

class Eyedntify extends Component {
  state = {
    spinning: false,
    isValid: false,
    loading: true
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated)
      this.setState((ps) => ({
        isValid: true
      }))

    if (nextProps.loader.spinning !== this.state.spinning) {
      this.setState((ps) => ({
        spinning: nextProps.loader.spinning,
      }))
    }
    if (nextProps.loader.loading !== this.state.loading) {
      this.setState((ps) => ({
        loading: nextProps.loader.loading,
      }))
    }

  }

  componentDidMount() {
    this.props.validateToken();
    setTimeout(() => {
      if (this.state.loading) // stopp loading in one second
        this.setState({ loading: false })
    }, 2000);
  }

  unload = (set) => {
    this.setState((ps) => ({
      loading: set
    }))
  }

  render() {
    const { isValid, loading, spinning } = this.state;
    return (
      <React.Fragment>
        <Navbar toMute={this.disableBtn} />
        {!isValid && <h1 style={{ marginTop: '10rem' }}>
          Your Session has expired</h1>}
        {isValid && <Loading loading={loading} />}
        {isValid && this.props.children}
        {spinning && <Spinner spinning={spinning} />}
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  loader: state.loader,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  validateToken: () => dispatch(validateToken()),
  deleteToken: () => dispatch(deleteToken()),
  hasLoaded: () => dispatch(hasLoaded()),
  isLoading: () => dispatch(isLoading()),
  startSpin: () => dispatch(startSpin()),
  stopSpin: () => dispatch(stopSpin())
});

export default connect(mapStateToProps, mapDispatchToProps)(Eyedntify)


export const setTitle = (title) => {
  document.getElementById('TITLE').innerText = 'Eyedntify | ' + title;
};