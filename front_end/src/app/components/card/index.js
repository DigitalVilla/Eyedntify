import React from 'react'
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import CardCaption from './CardCaption'
import Icon from '../Icon'
import classnames from 'classnames'
import {renderURL} from '../../redux/actions/act_fileUploader'


const Card = ({ body, dispatch }) => {
  let counter = 0;

  const likeHandler = () => {
    if (++counter === 2) {
      // dispatch({ type: 'LIKE_IMAGE', payload: body.id })
      counter = 0
    }
  }


  return (
    <div className="EyeCard">
      <CardHeader logo={renderURL('avatar',body.owner.avatar)} author={body.owner.username} />
      <figure onClick={likeHandler} >
        <img src={renderURL('post',body.image)}  alt="Your pic!" />
          <Icon
            className={classnames({ "hide": !body.liked })}
            size={"15rem"}
            icon={"heartFull"} />
      </figure>
      <CardFooter body={body} dispatch={dispatch} />
      <CardCaption author={body.owner.username} body={body} dispatch={dispatch} />
    </div>
  )
}

export default Card
