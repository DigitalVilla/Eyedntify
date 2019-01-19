import React from 'react'
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'

class Card extends React.Component {



  render() {
    const { favorite, action, author, image, likes, comments, caption } = this.props;

    function isLiked() {
      let isFound = false
      likes.forEach((e) => {
        if (e === "digitalVilla") {
          return isFound = true
        }
      })
      return isFound;
    }
  

    return (
      <div className="EyeCard">
        <CardHeader author={author} />
        <figure>
          <img src={image} alt="Your pic!" />
        </figure>
        <CardFooter
          isLiked={isLiked()}
          action={action}
          likes={likes}
          favorite={favorite}
          comments={comments}
          caption={caption}
        />
        {/* <Comments /> */}
      </div>
    )
  }
}

export default Card
