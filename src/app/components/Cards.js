import React, { Component } from 'react'
import Card from './card'

export default class Cards extends Component {
  state = {
    cards: [
      {
        id: "01",
        author: "Omar Villa",
        image: "/img/card-1.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite:false,
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
        author: "Omar Villa",
        image: "/img/card-1.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite:true,
        likes: [
          "Jon Doe",
          "Jane Hall",
          "digitalVilla",
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
        author: "Omar Villa",
        image: "/img/card-1.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite:false,
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
        author: "Omar Villa",
        image: "/img/card-1.jpg",
        caption: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, itaque?',
        favorite:false,
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
    ]
  }

  LikeHandler = (id) => {
    console.log(id);
    
    this.setState({
      cards: this.state.cards.map((e) => {
        if (e.id === id) {
          const result = e.likes.find((e, i, a) => a.splice(i, 1))
          if (result === undefined)
            e.likes.push(this.username)
        }
        return e;
      })
    })
    // this.forceUpdate()

  }

  render() {
    const { cards } = this.state;
    return (
      <React.Fragment>
        {
          cards.map((c, i) => {
            return <Card
              key={c.id}
              action={this.LikeHandler.bind(this, c.id)}
              author={c.author}
              image={c.image}
              caption={c.caption}
              favorite={c.favorite}
              likes={c.likes}
              comments={c.comments}
            />
          })
        }

      </React.Fragment>
    )
  }
}
