import React from 'react'

const Icon = (props) => {
    
    const styles = {
        height: props.size || "3rem",
        width: props.size || "3rem",
    }


    return (
        <button className="icon_BTN"
            onClick={props.action || null}>
            <svg className={props.className}
                style={styles}>
                <use
                    href={'img/sprite.svg#icon-' + props.icon}>
                </use>
            </svg>
        </button>
    )
}

export default Icon
