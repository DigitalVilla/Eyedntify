import React, { Component } from 'react'
import Card from '../components/card'
import Navbar from '../components/navbar';
import NewPost from '../components/NewPost';
import EyeBtn from '../components/EyeBtn'
import { validToken, validateToken } from '../redux/actions/act_authorize'
import { validPost, uploadPost, getAllPosts } from '../redux/actions/act_post'
import { getProfile } from '../redux/actions/act_profile'
import { connect } from 'react-redux';
import classnames from 'classnames'
import Loading from '../components/Loading'
import { isEmpty } from '../redux/utils/utils';

// const serverURI = process.env.REACT_APP_SERVER
// const io = require('socket.io-client')
class Home extends Component {
  state = {
    socket: null,
    toPost: false,
    newPost: {},
    user: {},
    posts: [],
    disable: false,
    loading: true,
    isValid: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.posts.length > 0 && nextProps.profile && nextProps.profile.profile) {
      setTimeout(() => {
        this.setState({
          posts: nextProps.posts.posts, loading: false,
          user: {
            ...this.state.user,
            favorite: nextProps.profile.profile.favorite,
            username: nextProps.profile.profile.user.username,
            avatar: nextProps.profile.profile.user.avatar,
            id: nextProps.profile.profile.user._id,
          }
        });
      }, 500);
    }
    if (nextProps.errors)
      this.setState({ errors: nextProps.errors });

  }

  componentDidMount() {
    this.props.validateToken();
    this.setState({ isValid: validToken() });
    this.props.getProfile({});
    this.props.getAllPosts({ local: false });
    // validateToken()
    // const socketURL = "http://localhost:5000";
    // const socketURL = " http://192.168.23.1:5000/";

    // var socket = io(socketURL)
    // this.setState({ socket })
    // this.initSocket(socket)
  }

  // initSocket = (socket) => {
  //   socket.on('connect', (value) => {
  //     console.log("Client Connected", value);
  //   })
  //   socket.on('disconnect', this.reconnectUserInfo)
  // }

  toPost = () => {
    const { toPost, disable, newPost } = this.state;
    if (!toPost)
      return this.setState({ toPost: true, disable: false })
    if (toPost) { //upload
      // const errors = isEmpty(newPost);
      if (!isEmpty(newPost)) {
        this.props.uploadPost(newPost)
        this.props.getAllPosts({ local: false });
      }
      this.setState({ toPost: false, newPost: {} })
    }
  }


  cancelPost = () => this.setState({ toPost: false, newPost: {} });
  disableBtn = () => this.setState({ disable: !this.state.disable });
  onChange = (e) => this.setState({ newPost: { ...this.state.newPost, caption: e.target.value } });
  setImage = (image) => {
    if (image)
      this.setState({ newPost: { ...this.state.newPost, image: image } });
    else
      this.setState({});
  }


  render() {
    const { isValid, loading, disable, posts, user, toPost } = this.state;

    return (
      <React.Fragment>
        <Navbar toMute={this.disableBtn} />
        <Loading loading={loading} />
        {!loading &&
          <React.Fragment>
            {!isValid && <h1 style={{ marginTop: '10rem' }}>Your Session has expired</h1>}
            {toPost &&
              <NewPost avatar={user.avatar}
                username={user.username}
                setImage={this.setImage}
                onChange={this.onChange}
                cancel={this.cancelPost} />
            }
            <div className="container home">
              {
                posts.map((c) => {
                  return <Card key={c._id} body={c} user={user} />
                })
              }
              <EyeBtn className={classnames({ "disable": disable })} icon="plane"
                onClick={this.toPost} />
            </div>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
  posts: state.posts,
});

export default connect(mapStateToProps, { validateToken, getProfile, uploadPost, getAllPosts })(Home);
