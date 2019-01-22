import React from 'react'
import Icon from '../../utils/Icon'
import classnames from 'classnames'

const CardFooter = ({body, dispatch}) => {
  
  const likeHandler = (id,e) => {
    dispatch({type:'LIKE_IMAGE', payload:id})
  }

  const favHandler = (id,e) => {
    dispatch({type:'FAV_IMAGE', payload:id})
  }

  const size = "3rem";
  return (
    <div className="EyeCard__footer">
      <Icon size={size}
        className={classnames({ "liked": body.liked })}
        action={likeHandler.bind(this, body.id)}
        icon={classnames({
          "heart": !body.liked,
          "heartFull": body.liked,
        })} />
      <Icon size={size} icon="comment" />
      <Icon
        className={classnames({ "favorite": body.favorite })}
        size={size}
        action={favHandler.bind(this, body.id)}
        icon={classnames({
          "star": !body.favorite,
          "starFull": body.favorite,
        })} />
    </div>
  )
}

export default CardFooter
