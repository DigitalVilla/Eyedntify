import React, { Component } from 'react'
import Navbar from '../components/navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, setProfile } from '../redux/actions/act_profile'
import { uploadImage, renderURL } from '../redux/actions/act_fileUploader'
import EyeBtn from '../components/EyeBtn'
import classnames from 'classnames';
import { fetchUser, validateToken } from '../redux/actions/act_authorize';

class Profile extends Component {
  state = {
    user: {

    },
    profile: {
      followers: [],
      favorite: [],
      following: [],
      posts: [],
      intro: '',
      edit: false
    }
  }

  componentWillMount() {
    this.props.validateToken();
    this.props.fetchUser();
  }
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile && nextProps.profile.profile)
      this.setState({ profile: nextProps.profile.profile });

    if (nextProps.auth && nextProps.auth.user)
      this.setState({ user: nextProps.auth.user });

    if (nextProps.uploads && nextProps.uploads.file)
      this.setState({ user: { ...this.state.user, [nextProps.uploads.type]: nextProps.uploads.file } });

    // if (nextProps.errors)
    //   this.setState({ errors: nextProps.errors, hasRegistered: false });

  }

  editProfile = (e) => {
    console.log(e.target.value);
    
    const edit = this.state.edit;
    this.setState({ edit: !edit })
    if (edit) { //upload
      // this.props.setProfile()
    }
  }

  onChange = (e) => this.setState({ profile: { ...this.state.profile, intro: e.target.value } });


  fileHandler = (e) => {
    const image = e.target.files[0];
    const value = e.target.name;
    if (image)
      this.props.uploadImage(image, value);
  }

  render() {
    const { user, profile, edit } = this.state;
    return (
      <React.Fragment>
        <Navbar />

        <div className="container profile">
          <input type="file" name="banner"
            id="uploader" onChange={this.fileHandler}
            ref={fileInput => this.bannerPicker = fileInput} />

          <input type="file" name="avatar"
            id="uploader" onChange={this.fileHandler}
            ref={fileInput => this.avatarPicker = fileInput} />

          <figure className={classnames("banner", { "editImage": edit })} >
            <h1>{user.username}</h1>
            <img onClick={() => edit ? this.bannerPicker.click() : ""}
              src={renderURL('banner', user.banner)}
              alt="Add Banner" />

            <img onClick={() => edit ? this.avatarPicker.click() : ""}
              className={classnames("headShot", { "editImage": edit })}
              src={renderURL('avatar', user.avatar)} alt="Avatar" />

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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  uploads: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  uploads: state.uploads,
  profile: state.profile
});

export default connect(mapStateToProps, { setProfile, fetchUser, validateToken, getCurrentProfile, uploadImage })(Profile);
