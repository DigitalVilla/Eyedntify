import React, { Component } from 'react';
import { likeHandler,favHandler } from './js/homeLogic';

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
      console.log("sad");
      break;
  }
}

export class Provider extends Component {
  state = {
    proxy:"http://localhost:5000",
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

export const Consumer = Context.Consumer;