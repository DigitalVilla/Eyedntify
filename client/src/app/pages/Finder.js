import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import Navbar from '../components/navbar';
import Loading from './Loading'
import { connect } from 'react-redux';
import { getUsers } from '../redux/actions/act_users'
import { validateToken } from '../redux/actions/act_authorize'
import {renderURL } from '../redux/actions/act_fileUploader'
import avatar from '../../img/holder_A.png';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Finder extends Component {
  state = {
    loading: true,
    query:'',
    user: {},
    users: []
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('recieve ',nextProps);
     if (nextProps.users.users.length > 0 && nextProps.auth.isAuthenticated)
      setTimeout(() => {
        this.setState({ user:nextProps.auth.user, users: nextProps.users.users, loading: false  })
      }, 400);
  }

  componentDidMount() {
    this.props.validateToken();
    setTimeout(() => {
    this.props.getUsers();
  }, 200);
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {
    const { loading, users, query } = this.state;
    console.log("render", + Math.floor(Date.now()/1000));
    
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
              <SearchBar value={query} onChange={this.updateQuery} placeholder="Search by..." />
              <ul className="userList">
              {
                filteredUsers.map((u,i)=> {
                 return  <li key={i}>
                 <img src={renderURL('avatar', u.avatar) || avatar} alt=""/>
                 <span>{u.username}</span>
                 <span>follow</span>
                 <span>unfollow</span>
                 </li>  
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
const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors,
});

export default connect(mapStateToProps, { getUsers, validateToken })(Finder);
