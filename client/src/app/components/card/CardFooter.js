import React from 'react'
import Icon from '../Icon'
import classnames from 'classnames'
import { } from '../../redux/actions/act_post'

const CardFooter = ({ likeHandler, faveHandler, state }) => {

  const size = "3rem";
  return (
    <div className="EyeCard__footer">
      <Icon size={size}
        className={classnames({ "liked": state.liked })}
        action={likeHandler}
        icon={classnames({
          "heart": !state.liked,
          "heartFull": state.liked,
        })} />
      <Icon size={size} icon="comment" />
      <Icon
        className={classnames({ "favorite": state.favorite })}
        size={size}
        action={faveHandler}
        icon={classnames({
          "star": !state.favorite,
          "starFull": state.favorite,
        })} />

    </div>
  )
}

export default CardFooter
