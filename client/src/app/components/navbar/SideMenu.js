import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import {spriteLoad} from './sprite'
import {SVG} from '../Icon'

const SideMenu = (props) => {
    spriteLoad();

    const onURL = (value) => {
        return window.location.pathname.indexOf(value) === 1;
    }
    return (
        <div className="menu-container hide">
            <div onClick={props.closeMenu}
                className={classnames("menu-bg", {
                    "fadeIn": props.toShow,
                    "fadeOut": !props.toShow
                })}> </div>
            <div className="sideMenu fadeOutRight">
                <ul className="sideMenu-list">
                    {
                        props.buttons.map((e, i) => {
                            let myClass = (onURL(e.value)) ? "active" : "";
                            return <Link key={i} onClick={props.btnHandler.bind(this, e.value)}  to={"/" + e.value}>
                                <li className={"sideMenu-item " + myClass} >
                                    <SVG className="sm" icon= {e.icon}/>
                                    <span>{e.value}</span>
                                </li>
                            </Link>
                        })
                    }
                    <div onClick= {props.animate.bind(this, 50)} style={{marginTop: props.animation.marginTop}}
                    className={classnames("sideMenu-img colibri",{[props.animation.still]: props.animation })}></div>
                    <div className="sideMenu-bg "></div>
                </ul>
            </div>
        </div>
    )
}
export default SideMenu;