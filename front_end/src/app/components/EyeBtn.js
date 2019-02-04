import React from 'react'
import sprite from '../../img/sprite.svg'

const EyeBtn = ({onClick,icon, style }) => {
  return (
    <button style={style || null}  className="plusBtn icon_BTN"
    onClick={onClick}>
    <svg>
      <use href={sprite + "#icon-"+icon}></use>
    </svg>
  </button>
  )
}

export default EyeBtn
