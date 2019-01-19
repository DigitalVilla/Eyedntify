import React from 'react'

export default function searchBox(props) {
    
    return (
        <div className="search">
            <input type="text" className="search_input" placeholder={props.placeholder}/>
            <svg className="search_icon">
                <use href="/img/sprite.svg#icon-magnifying-glass"></use>
            </svg>
        </div>
    )
}
