import React from 'react'

const navBtn = (props) => {
    return (
        <button onClick={props.action} className="myNav_btn">
            <svg>
                <use href={"/img/sprite.svg#icon" + props.icon}></use>
            </svg>
        </button>
    )
}

export default navBtn
