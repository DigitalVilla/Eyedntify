import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LIKE_IMAGE":
      return {
        ...state,
        cards: likeHandler(action.payload, state)
      }
    case "FAV_IMAGE":
      return {
        ...state,
        cards: favHandler(action.payload, state)
      }
    default:
      break;
  }
}

export class Provider extends Component {
  state = {
    proxy:"http://localhost:5000/",
    jwt : "",
    user: {
      email: "",
      username: "",
      avatar: "",
    },
    profile: {
      banner: "",
      intro: "",
      following: [],
      followers: [],
      favorite: [],
      posts: []
    },
    posts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  render() {
    return ( <Context.Provider
      value = {this.state}>
      {
        this.props.children
      } 
      </Context.Provider>
    )
  }
}

const likeHandler = (id, {cards, username}) => {
  return cards.map((c) => {
      if (c.id === id) {
          if (c.liked) { //eliminate
              c.likes.forEach((user, i, arr) => {
                  if (user === username) 
                      return arr.splice(i, 1)
              });
          } else { // add
              c.likes.push(username)
          }
          c.liked = !c.liked;
      }
      return c;
  })
}

const favHandler = (id, {cards}) => {
  return cards.map((c) => {
      if (c.id === id) {
          c.favorite = !c.favorite;
      }
      return c;
  })
}




export const Consumer = Context.Consumer;