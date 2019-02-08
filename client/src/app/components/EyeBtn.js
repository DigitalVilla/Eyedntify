import React from 'react'
import { SVG } from '../components/Icon'

const EyeBtn = ({ onClick, icon, style, className }) => {
  return (

    <button style={style || null} className={"plusBtn icon_BTN " + className}
      onClick={onClick}>
      <SVG icon={icon} />
    </button>
  )
}

export default EyeBtn
