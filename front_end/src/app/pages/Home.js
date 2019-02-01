import React, { Component } from 'react'
import Card from '../components/card'
import { Consumer } from '../Context'
import Navbar from '../components/navbar';
import NewPost from '../components/NewPost';
import sprite from '../../img/sprite.svg'

// const serverURI = process.env.REACT_APP_SERVER 
const io = require('socket.io-client')

class Home extends Component {
  state = {
    socket: null,
    newPost: false,
    post: {
      image: "",
      caption: ""
    }

  }

  componentWillMount() {
    const socketURL = "http://localhost:5000";
    // const socketURL = " http://192.168.23.1:5000/";
    
    var socket = io(socketURL)
		this.setState({ socket })
    this.initSocket(socket)
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
    const { newPost } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, cards, user } = value;
          return (
            <React.Fragment>
              <Navbar />
              {newPost &&
                <NewPost logo={user.logo}
                  username={user.username}
                  action={this.cancelPost} />
              }
              <div className="container home">
                {
                  cards.map((c) => {
                    return <Card key={c.id} body={c} dispatch={dispatch} />
                  })
                }
                <button className="plusBtn icon_BTN"
                  onClick={this.newPost}>
                  <svg>
                    <use href={sprite + "#icon-send"}></use>
                  </svg>
                </button>
              </div>
            </React.Fragment>
          )
        }}
      </Consumer>
    )
  }
}
export default Home
