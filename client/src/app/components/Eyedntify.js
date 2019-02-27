import React, { Component } from 'react'
import Navbar from './navbar';
import Loading from './Loading'
import { connect } from 'react-redux';
import { deleteToken, validateToken } from '../redux/actions/act_authorize'
import { hasLoaded, isLoading } from '../redux/actions/act_loader'
import { updateProfile } from '../redux/actions/act_profile'

class Eyedntify extends Component {
  state = {
    isValid: false,
    loading: true,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState((ps) => ({ isValid: true }))
    } else if (nextProps.auth.isAuthenticated) {
      this.setState((ps) => ({ isValid: false }))
    }

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
    this.props.updateProfile({ new: true });
    setTimeout(() => {
      if (this.state.loading) // stopp loading in 2 seconds
        this.setState({ loading: false })
    }, 2000);
  }

  unload = (set) => {
    this.setState((ps) => ({
      loading: set
    }))
  }

  render() {
    const { isValid, loading } = this.state;
    return (
      <React.Fragment>
        <Navbar toMute={this.disableBtn} />
        {!isValid && <h1 style={{ marginTop: '10rem' }}>
          Your Session has expired</h1>}
        {isValid && <Loading loading={loading} />}
        {isValid && this.props.children}
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  loader: state.loader,
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  validateToken: () => dispatch(validateToken()),
  updateProfile: () => dispatch(updateProfile()),
  deleteToken: () => dispatch(deleteToken()),
  hasLoaded: () => dispatch(hasLoaded()),
  isLoading: () => dispatch(isLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Eyedntify)


export const setTitle = (title) => {
  document.getElementById('TITLE').innerText = 'Eyedntify | ' + title;
};