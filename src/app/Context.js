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
    username: "DigitalVilla",
    cards: [
      {
        id: "01",
        logo: "/img/me.jpg",
        author: "Omar Villa",
        image: "/img/card-1.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite: false,
        liked: false,
        likes: [
          "Jon Doe",
          "Jane Hall",
          "Vincent Miles"
        ],
        comments: [
          {
            author: "Eli",
            comment: "text asjdasdasd lkjasd ",
          },
          {
            author: "Alex",
            comment: "text asjdasdasd lkjasd "
          }

        ]
      },
      {
        id: "02",
        logo: "/img/me.jpg",
        author: "Alterrester",
        image: "/img/card-2.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite: true,
        liked: true,
        likes: [
          "Jon Doe",
          "Jane Hall",
          "DigitalVilla",
          "Vincent Miles"
        ],
        comments: [
          {
            author: "Eli",
            comment: "text asjdasdasd lkjasd ",
          },
          {
            author: "Alex",
            comment: "text asjdasdasd lkjasd "
          }

        ]
      },
      {
        id: "03",
        logo: "/img/me.jpg",
        author: "DigitalVilla",
        image: "/img/card-3.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite: false,
        liked: true,
        likes: [
          "Jon Doe",
          "Jane Hall",
          "Vincent Miles"
        ],
        comments: [
          {
            author: "Eli",
            comment: "text asjdasdasd lkjasd ",
          },
          {
            author: "Alex",
            comment: "text asjdasdasd lkjasd "
          }

        ]
      },
      {
        id: "04",
        logo: "/img/me.jpg",
        author: "Omar Villa",
        image: "/img/card-4.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite: false,
        liked: false,
        likes: [
          "Jon Doe",
          "Jane Hall",
          "Vincent Miles"
        ],
        comments: [
          {
            author: "Eli",
            comment: "text asjdasdasd lkjasd ",
          },
          {
            author: "Alex",
            comment: "text asjdasdasd lkjasd "
          }

        ]

      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;