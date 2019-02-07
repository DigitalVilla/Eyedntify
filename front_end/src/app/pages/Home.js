import React, { Component } from 'react'
import Card from '../components/card'
import Navbar from '../components/navbar';
import NewPost from '../components/NewPost';
import EyeBtn from '../components/EyeBtn'
import { fetchUser } from '../redux/actions/act_authorize'
import { validPost, uploadPost, getAllPosts } from '../redux/actions/act_post'
import { connect } from 'react-redux';
import classnames from 'classnames'
// const serverURI = process.env.REACT_APP_SERVER 
const io = require('socket.io-client')
class Home extends Component {
  state = {
    socket: null,
    toPost: false,
    newPost: {},
    user: {},
    posts:[],
    disable: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.user)
      this.setState({ user: nextProps.auth.user });

    if (nextProps.posts && nextProps.posts.posts)
      this.setState({ posts: nextProps.posts.posts});

    if (nextProps.errors)
      this.setState({ errors: nextProps.errors });

  }


  componentWillMount() {
    this.props.fetchUser({ local: false });
    this.props.getAllPosts({ local: false });
  }

  componentDidMount() {
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
      const errors = validPost(newPost);
      if (typeof errors === 'boolean') {
        this.props.uploadPost(newPost)
        this.props.getAllPosts({ local: false });
      }
      this.setState({ toPost: false})
    }
  }


  cancelPost = () => this.setState({ toPost: false, newPost: {} });
  disableBtn = () => this.setState({ disable: !this.state.disable });
  onChange = (e) => this.setState({ newPost: { ...this.state.newPost, caption: e.target.value } });
  setImage = (image) => this.setState({ newPost: { ...this.state.newPost, image: image } });

  render() {
    const { disable, posts, user, toPost } = this.state;
    // console.log(posts);

    return (
      <React.Fragment>
        <Navbar toMute={this.disableBtn} />
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
              return <Card key={c.id} body={c}/>
            })
          }
          <EyeBtn className={classnames({ "disable": disable })} icon="send"
            onClick={this.toPost} />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  posts: state.posts,
});

export default connect(mapStateToProps, { fetchUser, uploadPost, getAllPosts })(Home);
