import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import Navbar from '../components/navbar';
import Loading from './Loading'
import { connect } from 'react-redux';
import { getUsers } from '../redux/actions/act_users'
import { validateToken } from '../redux/actions/act_authorize'
import { getProfile, updateProfile } from '../redux/actions/act_profile'
import { renderURL } from '../redux/actions/act_fileUploader'
import avatar from '../../img/avatar.png';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Icon from '../components/Icon'
import { binarySearch, swapR } from '../redux/utils/utils'
import classnames from 'classnames'


class Finder extends Component {
  state = {
    loading: true,
    query: '',
    user: '',
    following: [],
    users: [],
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && nextProps.users.users
      && nextProps.profile.profile && nextProps.users.users.length > 0
      && nextProps.auth.isAuthenticated && nextProps.profile.profile.intro)
      setTimeout(() => {
        this.setState({
          loading: false,
          users: nextProps.users.users,
          user: nextProps.profile.profile.user._id,
          following: nextProps.profile.profile.following.sort()
        })
      }, 300);
    if (!this.state.loading && nextProps.profile.profile) {
      this.setState({
        following: nextProps.profile.profile.following.sort()
      })
    }
  }

  componentDidMount() {
    this.props.validateToken();
    setTimeout(() => {
      this.props.getProfile({});
      this.props.getUsers();
    }, 300);
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  followHandler = (id) => {
    this.props.updateProfile({
      following: swapR(this.state.following, id)
    })
    // this.setState(state=>({
    //   following: swapR(state.following, id)
    // }))
  }

  componentWillUnmount () {
    console.log("CANELL APPLIATION");
  }

  render() {
    const { loading, users, query, user, following } = this.state;

    console.log("render: ", + Math.floor(Date.now() / 1000));

    let filteredUsers;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredUsers = users.filter((u) => match.test(u.username))
    } else {
      filteredUsers = users
    }


    return (

      <React.Fragment>
        <Navbar />
        <Loading loading={loading} />
        {!loading &&
          <React.Fragment>
            <div className="container finder">
              <div className="search__container">
                <SearchBar value={query} onChange={this.updateQuery} placeholder="Search by..." />
              </div>
              <ul className="userList">
                {
                  filteredUsers.map((u, i) => {
                    if (user === u._id) return;
                    return <UserCard onClick={this.followHandler}
                      following={following}
                      key={i} user={u} />
                  })
                }
              </ul>
            </div>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

const UserCard = ({ user, following, onClick }) => {
  const followed = binarySearch(following, user._id) > -1;

  return (
    <li className='userList__card'>
      <img className="noSelect" alt="Avatar"
        src={renderURL('avatar', user.avatar) || avatar} />
      <span>{user.username}</span>
      <div>
        <Icon action={onClick.bind(this, user._id)}
          className={classnames('userList__card--icon', { 'unfollowIcon': followed })}
          icon={followed ? 'unfollow' : 'follow'} />
        {/* <Icon icon='unfollow' /> */}
      </div>
    </li>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateProfile, getProfile, getUsers, validateToken })(Finder);
