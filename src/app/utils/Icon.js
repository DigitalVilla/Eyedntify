import React from 'react'
import sprite from '../../img/sprite.svg'

const Icon = (props) => {
    
    const styles = {
        height: props.size,
        width: props.size
    }

    return (
        <button style={styles}
            className="icon_BTN"
            onClick={props.action}>
            <svg className={props.className}
                style={styles}>
                <use
                    href={sprite + '#icon-' + props.icon}>
                </use>
            </svg>
        </button>
    )
}

export default Icon
