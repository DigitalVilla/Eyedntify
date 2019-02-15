import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { SVG } from '../Icon'

const SideMenu = (props) => {


    const onURL = (value) => {
        return window.location.pathname.indexOf(value) === 1;
    }
    return (
        <div className="menu-container hide">
            <div onClick={props.closeMenu}
                className={classnames("sideMenu__bg", {
                    "fadeIn": props.toShow,
                    "fadeOut": !props.toShow
                })}> </div>
            <div className="sideMenu fadeOutRight">
                <ul className="sideMenu__list">
                    {
                        props.buttons.map((e, i) => {
                            let myClass = (onURL(e.value)) ? "active" : "";
                            return <Link key={i} onClick={props.btnHandler.bind(this, e.value)} to={"/" + e.value}>
                                <li className={"sideMenu__item " + myClass} >
                                    <SVG className="sm" icon={e.icon} />
                                    <span>{e.value}</span>
                                </li>
                            </Link>
                        })
                    }
                </ul>
                <div onClick={props.animate.bind(this, 50)}
                    style={{ marginTop: props.animation.marginTop }}
                    className={classnames("sideMenu__bird colibri", { [props.animation.still]: props.animation })}></div>
            </div>
        </div>
    )
}
export default SideMenu;