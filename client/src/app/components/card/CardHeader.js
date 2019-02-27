import React from 'react'
import Icon from '../Icon'
import avatar from '../../../img/holder_A.png';

const CardHeader = (props) => {


  return (
    <div className="EyeCard__header">
      <div>
        <img src={props.logo || avatar} alt="dImage" />
        <span> {props.author}</span>
      </div>
      <Icon
        action={props.owner ? props.onClick : ''}
        size='3rem'
        icon={props.owner ? 'cancel' : "dots"} />
    </div>
  )
}

export default CardHeader
