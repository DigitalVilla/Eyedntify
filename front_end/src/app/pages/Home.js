import React, { Component } from 'react'
import Card from '../components/card'
import Navbar from '../components/navbar';
import NewPost from '../components/NewPost';
import  EyeBtn from '../components/EyeBtn'
import  {fetchUser} from '../redux/actions/act_authorize'
import { connect } from 'react-redux';
// const serverURI = process.env.REACT_APP_SERVER 
const io = require('socket.io-client')

class Home extends Component {
  state = {
    socket: null,
    newPost: false,
    post: {},
    user:{}

  }

  componentWillReceiveProps(nextProps) {
console.log(nextProps);

    if (nextProps.auth.user)
    return this.setState({ user : nextProps.auth.user});

    if (nextProps.uploads && nextProps.uploads.file)
      this.setState({ user: { ...this.state.user, [nextProps.uploads.type]: nextProps.uploads.file } });

    if (nextProps.errors)
      this.setState({ errors: nextProps.errors});

  }


  componentDidMount() {
    this.props.fetchUser({local:true});
    // validateToken()
    const socketURL = "http://localhost:5000";
    // const socketURL = " http://192.168.23.1:5000/";

    // var socket = io(socketURL)
    // this.setState({ socket })
    // this.initSocket(socket)
  }

  initSocket = (socket) => {
    socket.on('connect', (value) => {
      console.log("Client Connected", value);
    })
    socket.on('disconnect', this.reconnectUserInfo)
  }

  addImage = () => {
  }
  addCaption = () => {

  }

  newPost = (e) => {
    const { newPost } = this.state;

    if (!newPost)
      return this.setState({ newPost: true })

    // let el = document.getElementById("newPost")

    // let img = el.children;
    // console.log(img);


    // this.setState({newPost: !newPost})
    // this.setState({newPost: !newPost})
  }

  cancelPost = () => {
    this.setState({ newPost: false })
  }

  render() {
    const { dispatch, posts, user, newPost } = this.state;
    
    return (
      <React.Fragment>
        <Navbar />
        {newPost &&
          <NewPost avatar={user.avatar}
            username={user.username}
            action={this.cancelPost} />
        }
        <div className="container home">
          {/* {
            posts.map((c) => {
              return <Card key={c.id} body={c} dispatch={dispatch} />
            })
          } */}
        <EyeBtn icon="send" onClick={this.newPost}/>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  uploads: state.uploads,
});

export default connect(mapStateToProps, { fetchUser })(Home);
