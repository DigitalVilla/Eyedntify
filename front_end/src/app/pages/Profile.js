import React, { Component } from 'react'
import Navbar from '../components/navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile, updateProfile } from '../redux/actions/act_profile'
import { uploadImage, renderURL } from '../redux/actions/act_fileUploader'
import EyeBtn from '../components/EyeBtn'
import classnames from 'classnames';
import { validateToken } from '../redux/actions/act_authorize';
import avatar from '../../img/holder_A.png';
import banner from '../../img/holder_B.png';


class Profile extends Component {
  state = {
    following: [],
    followers: [],
    favorite: [],
    edit: false,
    posts: [],
    user: { avatar, banner },
    intro: ''
  }

  componentWillMount() {
    // this.props.validateToken();
    // this.props.getProfile();
  }
  componentDidMount() {
    this.props.getProfile();
    // this.setState(state => {
    //   state.user.avatar = avatar;
    //   state.user.banner = banner;
    //   return state
    // })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile && nextProps.profile.profile) {
      const {following, followers, posts, favorite, user, intro} = nextProps.profile.profile;
      this.setState({  following, followers, posts, favorite, user, intro});
    }

    if (nextProps.uploads && nextProps.uploads.file)
      this.setState({ user: { ...this.state.user, [nextProps.uploads.type]: nextProps.uploads.file } });

    if (nextProps.errors)
      this.setState({ errors: nextProps.errors});

  }

  editProfile = (e) => {
    const {edit, intro } = this.state
    this.setState({ edit: !edit })
    if (edit) { //upload
      this.props.updateProfile({intro})
    }
  }

  onChange = (e) => this.setState({ intro: e.target.value });


  uploadFile = (e) => {
    const image = e.target.files[0];
    const value = e.target.name;
    if (image)
      this.props.uploadImage(image, value);
  }

  render() {
    const {following, followers, posts, favorite, user, intro, edit} = this.state;
    console.log('rendered');
    
    return (
      <React.Fragment>
        <Navbar />
        <div className="container profile">
          <input type="file" id="uploader" 
             onChange={this.uploadFile} name="banner"
            ref={fileInput => this.bannerPicker = fileInput} />

          <input type="file" id="uploader"
             onChange={this.uploadFile} name="avatar"
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
              <li><span>{(posts).length}</span>Eyefy's</li>
              <li><span>{(favorite).length}</span>Favorite</li>
            </ul>
            <ul>
              <li><span>{(following).length}</span>Following</li>
              <li><span>{(followers).length}</span>Followers</li>
            </ul>
          </div>
          <div className="about">
            {!edit && <p className={classnames({"placeholder": intro ==='' })}>{intro || "& tell the world about you "}</p>}
            {edit && <textarea className="editText"
              onChange={this.onChange}
              placeholder="Write here"
              maxLength="300"
              name='intro'
              value={intro} />}

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

export default connect(mapStateToProps, { updateProfile, getProfile, validateToken, uploadImage })(Profile);
