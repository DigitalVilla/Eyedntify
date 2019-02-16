import React, { Component } from 'react'
import Navbar from '../components/navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile, updateProfile } from '../redux/actions/act_profile'
import { uploadImage, renderURL, renderLocal } from '../redux/actions/act_fileUploader'
import EyeBtn from '../components/EyeBtn'
import classnames from 'classnames';
import { validateToken } from '../redux/actions/act_authorize';
import avatar from '../../img/avatar.png';
import banner from '../../img/holder_B.png';
import Loading from './Loading'
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
    loading: true,
    spinning: false
  }

  componentDidMount() {
    this.props.getProfile({});
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.intro != '') return;
    if (nextProps.profile && nextProps.profile.profile) {
      const { following, followers, posts, favorite, user, intro } = nextProps.profile.profile;
      setTimeout(() => {
        this.setState({ following, followers, posts, favorite, user, intro, loading: false });
      }, 500);
    }
  }

  editProfile = (e) => {
    const { edit, intro, avatarFile, bannerFile } = this.state
    if (!edit) //open edit 
      this.setState({ edit: !edit })
    
    if (edit) { //upload
      this.setState({spinning:true })
      this.props.uploadImage(bannerFile, "banner", "UDP"); // online
      this.props.uploadImage(avatarFile, "avatar", "UDP"); //online
      this.props.updateProfile({ intro })
      setTimeout(() => {
        this.setState({ edit: !edit })
      }, 500);
    }
  }

  onChange = (e) => this.setState({ intro: e.target.value });

  uploadFile = (e) => {
    const image = e.target.files[0];
    const value = e.target.name;
    if (image && image.type.indexOf('image') === 0) {
      renderLocal(image, (url) => {
        this.setState({ [value + 'Local']: url, [value + "File"]: image })
      })
    }
  }

  disableBtn = () => this.setState({ disable: !this.state.disable })

  render() {
    const { loading, following,spinning, followers, posts, favorite, user, intro, edit, disable, avatarLocal, bannerLocal } = this.state;

    return (
      <React.Fragment>
        <Navbar toMute={this.disableBtn} />
        <Loading loading={loading} />
          {!loading &&
          <React.Fragment>
            <div className="container profile">
              <input type="file" onChange={this.uploadFile} name="banner"
                id="uploader" ref={fileInput => this.bannerPicker = fileInput} />
              <input type="file" onChange={this.uploadFile} name="avatar"
                id="uploader" ref={fileInput => this.avatarPicker = fileInput} />

              <figure className={classnames("banner", { "editImage": edit })} >
                <h1>{user.username}</h1>
                <img onClick={() => edit ? this.bannerPicker.click() : ""}
                  src={bannerLocal || renderURL('banner', user.banner)}
                  alt="Add Banner" />
                <img onClick={() => edit ? this.avatarPicker.click() : ""}
                  className={classnames("headShot", { "editImage": edit })}
                  src={avatarLocal || renderURL('avatar', user.avatar)} alt="Avatar" />
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
                style={{ paddingLeft: '7px' }} onClick={this.editProfile} />
                <Spinner  spinning={true} />
            </div>
          </React.Fragment>
          }
      </React.Fragment>
      )
    }
  }
  
  
Profile.propTypes = {
          auth: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired,
      };
      
const mapStateToProps = state => ({
          auth: state.auth,
        errors: state.errors,
        // uploads: state.uploads,
        profile: state.profile
      });
      
export default connect(mapStateToProps, {updateProfile, getProfile, validateToken, uploadImage })(Profile);
