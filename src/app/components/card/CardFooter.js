import React from 'react'
import Icon from '../../utils/Icon'

const CardFooter = (props) => {

  const LikeHandler = (e) => {
    props.action();
    let svg = e.target.children[0];
    svg.classList.toggle("liked")

  }

  const favHandler = (e) => {
    props.action();
    let svg = e.target.children[0];
    svg.classList.toggle("liked")
    // this.forceUpdate()
  }


  const { isLiked, favorite } = props;

  const size = "3rem";
  return (
    <div className="EyeCard__footer">
      <Icon size={size}
      className= {isLiked ? "liked" : ""}
        action={LikeHandler}
        icon={isLiked ? "heartFull": "heart" } />
      <Icon size={size} icon="comment" />
      <Icon
      className={favorite ? "favorite" : ""}
        size={size}
        action={favHandler}
        icon={!favorite ? "star" : "starFull"} />
    </div>
  )
}

export default CardFooter
