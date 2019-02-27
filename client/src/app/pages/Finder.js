import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux';
import { getUsers } from '../redux/actions/act_users'
import { updateProfile, followUser } from '../redux/actions/act_profile'
import { renderURL } from '../redux/actions/act_fileUploader'
import avatar from '../../img/avatar.png';
import escapeRegExp from 'escape-string-regexp'
import Icon from '../components/Icon'
import { binarySearch } from '../redux/utils/utils'
import classnames from 'classnames'
import Eyedntify, { setTitle } from '../components/Eyedntify';
import { hasLoaded } from '../redux/actions/act_loader'

class Finder extends Component {
  state = {
    loading: true,
    query: '',
    user: '',
    following: [],
    users: [],
    toSearch: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && nextProps.users.users
      && nextProps.profile.profile && nextProps.users.users.length > 0
      && nextProps.auth.isAuthenticated && nextProps.profile.profile.intro) {
      this.setState({
        loading: false,
        users: nextProps.users.users,
        user: nextProps.profile.profile.user._id,
        following: nextProps.profile.profile.following.sort()
      })
      setTimeout(() => {
        this.props.hasLoaded();
      }, 500);
    }

    if (!this.state.loading && nextProps.profile.profile) {
      this.setState({
        following: nextProps.profile.profile.following.sort()
      })
    }
  }

  componentDidMount() {
    setTitle('Finder');
    this.props.getUsers();
    this.props.updateProfile({ new: true });
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  followHandler = (id) => {
    this.props.followUser(id);
  }

  componentWillUnmount() {
  }

  displaySearch = (e) => {
    this.setState((state) => ({
      toSearch: !state.toSearch
    }))
  }


  render() {
    const { users, query, toSearch, user, following } = this.state;

    // console.log("render: ", + Math.floor(Date.now() / 1000));

    let filteredUsers;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredUsers = users.filter((u) => match.test(u.username))
    } else {
      filteredUsers = users
    }


    return (
      <Eyedntify >
        <div className="container finder">
          <SearchBar value={query}
            onChange={this.updateQuery}
            onClick={this.displaySearch}
            toSearch={toSearch}
            placeholder="Search by..." />

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
      </Eyedntify>
    )
  }
}

const UserCard = ({ user, following, onClick }) => {
  const followed = binarySearch(following, user._id) > -1;


  return (
    <div className="userList__bg">
      <li className='userList__card'>
        <figure >
          <img className="noSelect" alt="Avatar"
            src={renderURL('avatar', user.avatar) || avatar} />
        </figure>
        <span>{user.username}</span>
        <div>
          <Icon action={onClick.bind(this, user._id)}
            className={classnames('userList__card--icon', { 'unfollowIcon': followed })}
            icon={followed ? 'unfollow' : 'follow'} />
          {/* <Icon icon='unfollow' /> */}
        </div>
      </li>

    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  profile: state.profile,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (a) => dispatch(updateProfile(a)),
  hasLoaded: () => dispatch(hasLoaded()),
  getUsers: () => dispatch(getUsers()),
  followUser: (a) => dispatch(followUser(a)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Finder);
