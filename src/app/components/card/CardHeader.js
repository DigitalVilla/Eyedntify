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
        action = {props.action}
        size='3rem'
        icon={props.icon ||"dots"} />
    </div>
  )
}

export default CardHeader
