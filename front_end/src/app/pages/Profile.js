import React, { Component } from 'react'
import Navbar from '../components/navbar';
import {Consumer} from '../Context'

export default class Profile extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { user, profile } = value;
          return (
            <React.Fragment>
              <Navbar />
              <div className="container profile">
                <figure className="banner">
                  <img src={profile.banner} alt="banner" />
                  <img className="headShot" src={user.logo} alt="user" />
                </figure>
                <div className="badges">
                  <ul>
                    <li><span>{(profile.followers).length}</span>Followers</li>
                    <li><span>{(profile.favorite).length}</span>Favorite</li>
                  </ul>
                  <ul>
                    <li><span>{(profile.posts).length}</span>Posts</li>
                    <li><span>{(profile.following).length}</span>Following</li>
                  </ul>
                </div>
                <div className="about">
                  <h1>{user.username}</h1>
                  <p>{profile.intro}</p>
                </div>
              </div>
            </React.Fragment>
          )
        }
        }
      </Consumer>
    )
  }
}
