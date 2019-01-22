import React from 'react'
import Icon from '../../utils/Icon'
const CardHeader = (props) => {
  return (
    <div className="EyeCard__header">
      <div>
        <img src={props.logo} alt="d$@" />
        <span> {props.author}</span>
      </div>
      <Icon
        size='3rem'
        icon="dots" />
    </div>
  )
}

export default CardHeader
