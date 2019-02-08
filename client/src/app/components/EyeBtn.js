import React from 'react'

const EyeBtn = ({onClick,icon, style, className }) => {
  return (

    <button style={style || null}  className={"plusBtn icon_BTN "+className}
    onClick={onClick}>
    <svg>
      <use href={"img/sprite.svg#icon-"+icon}></use>
    </svg>
  </button>
  )
}

export default EyeBtn
