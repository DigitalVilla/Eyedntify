import React from 'react'
import classnames from 'classnames'
import sprite from '../../../img/sprite.svg'
import { Link } from 'react-router-dom'
import {spriteLoad} from './sprite'

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
                                    <svg className="sm">
                                        <use href={sprite + '#icon-' + e.icon}>
                                        </use>
                                    </svg>
                                    <span>{e.value}</span>
                                </li>
                            </Link>
                        })
                    }
                    <div onClick= {props.animate.bind(this, 50)} className="sideMenu-img colibri"></div>
                    <div className="sideMenu-bg "></div>
                </ul>
            </div>
        </div>
    )
}
export default SideMenu;