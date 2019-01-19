import React from 'react'
import Icon from '../../utils/Icon'
const CardHeader = () => {
  return (
    <div className="EyeCard__header">
      <div>
        <img src="" alt="d$@" />
        <span> Username</span>
      </div>
      <Icon
        // className={favorite ? "favorite" : ""}
        size='3rem'
        // action={favHandler}
        icon="dots" />
    </div>
  )
}

export default CardHeader
