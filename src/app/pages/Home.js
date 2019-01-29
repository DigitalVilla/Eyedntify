import React, { Component } from 'react'
import Card from '../components/card'
import { Consumer } from '../Context'
import Navbar from '../components/navbar';
import NewPost from '../components/NewPost';
import sprite from '../../img/sprite.svg'

class Home extends Component {
  state = {
    newPost : false,
    post:{
          image: "",
          caption:""
        }

  }

  addImage=()=> {
  }
  addCaption=()=> {
   
  }

  newPost = (e) => {
    const {newPost} = this.state;

    if (!newPost)
    return this.setState({newPost: true})
  
    // let el = document.getElementById("newPost")

    // let img = el.children;
    // console.log(img);


    // this.setState({newPost: !newPost})
    // this.setState({newPost: !newPost})


  }




  cancelPost = () => {
    this.setState({newPost: false})
  }

  render() {
    const {newPost} = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, cards, user } = value;
          return (
            <React.Fragment>
              <Navbar />
              { newPost &&
                <NewPost logo={user.logo}
                  username={user.username}
                  action={this.cancelPost}/>
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
