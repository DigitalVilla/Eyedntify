import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile } from '../redux/actions/act_profile'
import { uploadImage, renderURL, renderLocal } from '../redux/actions/act_fileUploader'
import { hasLoaded } from '../redux/actions/act_loader'
import EyeBtn from '../components/EyeBtn'
import classnames from 'classnames';
import avatar from '../../img/holder_A.png';
import banner from '../../img/holder_B.png';
import Eyedntify, { setTitle } from '../components/Eyedntify';
import Spinner from "../components/Spinner";

class Profile extends Component {
  state = {
    following: [],
    followers: [],
    favorite: [],
    edit: false,
    posts: [],
    user: { avatar, banner },
    intro: '',
    disable: false,
    avatarLocal: '',
    bannerLocal: '',
    hasChanged: false,
    spinning: false,
    reloaded: false
  }

  componentDidMount() {
    setTitle('Profile')

    // this.props.updateProfile({ new: true });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('Profile', nextProps);
    if (this.state.intro != '') return; //load live and do not wait for ajax
    if (nextProps.profile.profile) {
      const { following, followers, posts, favorite, user, intro } = nextProps.profile.profile;
      this.setState({ following, followers, posts, favorite, user, intro });
      setTimeout(() => {
        this.props.hasLoaded();
      }, 700);
    }
  }

  editProfile = (e) => {
    const { edit, intro, avatarFile, bannerFile, hasChanged } = this.state
    if (!edit)
      this.setState({ edit: true })

    if (edit) { //upload
      this.setState({ spinning: true });
      setTimeout(() => {
        if (hasChanged) {
          this.props.uploadImage(bannerFile, "banner", "UDP"); // online
          this.props.uploadImage(avatarFile, "avatar", "UDP"); //online
          this.props.updateProfile({ intro })
        }
        setTimeout(() => {
          this.setState({ spinning: false });
          setTimeout(() => {
            this.setState({ edit: false, hasChanged: false })
          }, 400);
        }, 400)
      }, 400);

    }
  }

  onChange = (e) => this.setState({ intro: e.target.value, hasChanged: true });

  uploadFile = (e) => { // load local image

    const image = e.target.files[0];
    const value = e.target.name;
    if (image && image.type.indexOf('image') === 0) {
      renderLocal(image, (url) => {
        this.setState({ [value + 'Local']: url, [value + "File"]: image, hasChanged: true })
      })
    }
  }

  disableBtn = () => this.setState({ disable: !this.state.disable })

  render() {
    const { following, followers, posts, spinning, favorite, user, intro, edit, disable, avatarLocal, bannerLocal } = this.state;
    // console.log(this.state);

    return (
      <Eyedntify >
        <div className="container profile">
          <Spinner spinning={spinning} />
          <input type="file" onChange={this.uploadFile} name="banner"
            id="uploader" ref={fileInput => this.bannerPicker = fileInput} />
          <input type="file" onChange={this.uploadFile} name="avatar"
            id="uploader" ref={fileInput => this.avatarPicker = fileInput} />

          <figure className={classnames("banner", { "editImage": edit })} >
            <h1>{user.username}</h1>
            <img onClick={() => edit ? this.bannerPicker.click() : ""}
              src={bannerLocal || renderURL('banner', user.banner || banner)} //chose recent file or DB file
              alt="Add Banner" />
            <img onClick={() => edit ? this.avatarPicker.click() : ""}
              className={classnames("headShot", { "editImage": edit })}
              src={avatarLocal || renderURL('avatar', user.avatar || avatar)} alt="Avatar" />
          </figure>

          <div className="badges">
            <ul>
              <li><span>{(posts).length}</span>Posts</li>
              <li><span>{(favorite).length}</span>Favorite</li>
            </ul>
            <ul>
              <li><span>{(following).length}</span>Following</li>
              <li><span>{(followers).length}</span>Followers</li>
            </ul>
          </div>
          <div className="about">
            {!edit &&
              <p className={classnames({ "placeholder": intro === '' })}>
                {intro || "& tell the world about you "}</p>}
            {edit &&
              <textarea className="editText"
                onChange={this.onChange}
                placeholder="Write here"
                maxLength="300"
                name='intro'
                value={intro} />}
          </div>
          <EyeBtn icon={!edit ? "pencil" : "upload"} className={classnames({ "disable": disable })}
            style={{ paddingLeft: !edit ? "7px" : "0" }} onClick={this.editProfile} />
        </div>
      </Eyedntify>
    )
  }
}


Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  loader: state.loader,
  errors: state.errors,
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (a, b, c) => dispatch(uploadImage(a, b, c)),
  updateProfile: (a) => dispatch(updateProfile(a)),
  hasLoaded: () => dispatch(hasLoaded())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
