import React from 'react'
// import Icon from '../../utils/Icon'
import logo  from '../../../img/icon.png'
import {Link} from 'react-router-dom'
export default function searchBox(props) {
    
    return (
        <Link to= "/home">
        <div className="title">
        <img src={logo} alt="logo"/>
            Eyedentify
        </div>
        </Link>

        // <div className="search">
        //     <input type="text" className="search_input" placeholder={props.placeholder}/>
        //     <Icon 
        //         className="search_icon"
        //         icon ="search"/>
        // </div>
    )
}
