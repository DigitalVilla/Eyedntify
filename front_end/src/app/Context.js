import React, {
  Component
} from 'react';
import {
  likeHandler,
  favHandler
} from './js/homeLogic';

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
    user: {
      username: "DigitalVilla",
      logo: "/img/me.jpg",
      profile: {
        banner: "/img/linus.png",
        intro: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, eum dolorem natus velit facilis autem, voluptates soluta excepturi nihil quidem quas voluptas eligendi vero voluptatibus laudantium iste, necessitatibus impedit?",
        following: [],
        followers: [],
        favorite: [],
        posts: []
      }
    },
    cards: [{
        id: "01",
        logo: "/img/me.jpg",
        author: "OmarVilla",
        image: "/img/card-1.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite: false,
        liked: false,
        likes: [
          "JoDoe",
          "JaneHall",
          "Vincent Miles"
        ],
        comments: [{
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
         caption: 'esta imagen a hcambiado mi perspectiva de la vida ae unad ela s mas ermsoas de ka camisna se ens daoe aler u  nsa nehr smaej en un ade las tard',
        favorite: true,
        liked: true,
        likes: [
          "JonDoe",
          "JaneHall",
          "DigitalVilla",
          "Vincent Miles"
        ],
        comments: [{
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
        comments: [{
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
        author: "Villa",
        image: "/img/card-4.jpg",
        caption: 'esta imagen a hcambiado mi perspectiva de la vida ae unad ela s mas ermsoas de ka camisna se ens daoe aler u  nsa nehr smaej en un ade las tard',
        favorite: false,
        liked: false,
        likes: [
         
        ],
        comments: [{
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