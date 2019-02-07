import React from 'react'
// import Icon from '../Icon'
import logo  from '../../../img/icon.png'
import {Link} from 'react-router-dom'
export default function searchBox(props) {
    
    return (
        <Link to= "/home" className="title" onClick={props.action.bind(this)}>
            <img className="title" src={logo} alt="logo"/>
            Eyedentify
        </Link>
        // <div className="search">
        //     <input type="text" className="search_input" placeholder={props.placeholder}/>
        //     <Icon 
        //         className="search_icon"
        //         icon ="search"/>
        // </div>
    )
}
