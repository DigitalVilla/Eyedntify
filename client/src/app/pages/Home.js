import React, { Component } from 'react'
import Card from '../components/card'
import NewPost from '../components/NewPost';
import EyeBtn from '../components/EyeBtn'
import { uploadPost, getAllPosts } from '../redux/actions/act_post'
import { connect } from 'react-redux';
import classnames from 'classnames'
import { isEmpty } from '../redux/utils/utils';
import Eyedntify, { setTitle } from '../components/Eyedntify';
import { hasLoaded } from '../redux/actions/act_loader'
import Spinner from "../components/Spinner";
import { updateProfile } from '../redux/actions/act_profile'

// const serverURI = process.env.REACT_APP_SERVER
// const io = require('socket.io-client')
class Home extends Component {
  state = {
    socket: null,
    toPost: false,
    spinning: false,
    newPost: {},
    user: {},
    posts: [],
    disable: false,
    hasLoaded: false
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps)
    if (nextProps.posts.posts && nextProps.posts.posts.length > 0
      && nextProps.profile.profile && nextProps.profile.profile.user) {
      const { favorite, user } = nextProps.profile.profile;
      this.setState({
        posts: nextProps.posts.posts,
        user: {
          ...this.state.user,
          favorite: favorite,
          username: user.username,
          avatar: user.avatar,
          id: user._id,
        }
      });
      if (!this.state.hasLoaded)
        setTimeout(() => {
          this.setState({ hasLoaded: true })
          this.props.hasLoaded(); //call loading only once
        }, 1000);

      if (this.state.spinning) {
        setTimeout(() => {
          this.setState({ spinning: false });
          setTimeout(() => {
            this.setState({ toPost: false, newPost: {}, });
          }, 500);
        }, 500);
      }

    }
    if (nextProps.errors)
      this.setState({ errors: nextProps.errors });
  }

  componentDidMount() {
    setTitle('Home');
    // this.props.updateProfile({ new: true });
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
    const { toPost, newPost } = this.state;
    if (!toPost)
      return this.setState({ toPost: true, disable: false })
    if (toPost) { //upload
      // const errors = isEmpty(newPost);
      if (!isEmpty(newPost)) {
        this.setState({ spinning: true, })
        this.props.uploadPost(newPost)
        this.props.getAllPosts({ local: false });
      } else {
        this.setState({ toPost: false, newPost: {} })
      }
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
    const { disable, posts, user, toPost, spinning } = this.state;

    return (
      <Eyedntify >
        {toPost &&
          <NewPost avatar={user.avatar}
            username={user.username}
            setImage={this.setImage}
            onChange={this.onChange}
            cancel={this.cancelPost} />
        }
        <Spinner spinning={spinning} />
        <div className="container home">
          {
            posts.map((c) => {
              return <Card key={c._id} post={c} user={user} />
            })
          }
          <EyeBtn className={classnames({ "disable": disable })} icon="plane"
            onClick={this.toPost} />
        </div>
      </Eyedntify>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (a) => dispatch(updateProfile(a)),
  getAllPosts: (a) => dispatch(getAllPosts(a)),
  uploadPost: (a) => dispatch(uploadPost(a)),
  hasLoaded: () => dispatch(hasLoaded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
