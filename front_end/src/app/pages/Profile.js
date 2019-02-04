import React, { Component } from 'react'
import Navbar from '../components/navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, createProfile } from '../redux/actions/act_profile'
import { getUser } from '../redux/actions/act_authorize'
import EyeBtn from '../components/EyeBtn'
import Icon from '../components/Icon'
import classnames from 'classnames';

class Profile extends Component {
  state = {
    user: {},
    profile: {
      banner: "",
      followers: [],
      favorite: [],
      following: [],
      posts: [],
      intro: '',
      edit: false
    }
  }

  componentWillMount() {
    getUser().then((user) => this.setState({ user }))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile)
      this.setState({ profile: nextProps.profile.profile });
    if (nextProps.auth.user)
      this.setState({ user: nextProps.auth.user });

    // if (nextProps.errors)
    //   this.setState({ errors: nextProps.errors, hasRegistered: false });

  }

  editProfile = () => {
    const edit = this.state.edit;
    this.setState({ edit: !edit })
    if (edit) { //upload

    }
  }

  onChange = (e) => this.setState({ profile: { ...this.state.profile, intro: e.target.value} });
  
  
  imageHandler = (e) => {
    // const file = e.target.files[0];
    console.log(e.target);

    // this.setState({edit:!this.state.edit})
  }
  fileHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);

    // this.setState({edit:!this.state.edit})
  }

  render() {
    const { user, profile, edit } = this.state;
    return (
      <React.Fragment>
        <Navbar />

        <div className="container profile">
          {false &&
            <div>
              <input type="file" onChange={this.fileHandler} />
            </div>
          }
          <figure className={classnames("banner", {"editImage": edit})} >
          <h1>{user.username}</h1>

            <img onClick={edit? this.imageHandler: ""}
            src={profile.banner || user.avatar} 
            alt="banner" />
            
            <img onClick={edit? this.imageHandler: ''}
            className={classnames("headShot", {"editImage": edit})}
            src={user.avatar} alt="user" />
          
          </figure>
          <div className="badges">
            <ul>
              <li><span>{(profile.posts).length}</span>Eyefy's</li>
              <li><span>{(profile.favorite).length}</span>Favorite</li>
            </ul>
            <ul>
              <li><span>{(profile.following).length}</span>Following</li>
              <li><span>{(profile.followers).length}</span>Followers</li>
            </ul>
          </div>
          <div className="about">
            {!edit && <p>{profile.intro || "Tell the world about you "}</p>}
            {edit && <textarea className="editText"
            onChange={this.onChange}
            placeholder="Write here"
            maxLength="300" 
            name='intro'
            value={profile.intro} />}

          </div>
          <EyeBtn icon={!edit ? "pencil" : "upload"}
            style={{ paddingLeft: '7px' }} onClick={this.editProfile} />
        </div>
      </React.Fragment>
    )
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(Profile);