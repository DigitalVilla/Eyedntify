import React, { Component } from 'react'

class SideMenu extends Component {
    render() {
        return (
            <div className="menu-container hide">
                <div className="menu-bg fadeOut"> </div>
                <div className="sideMenu fadeOutRight">
                    <ul className="sideMenu-list">
                        <li className="sideMenu-item"> Login | Register</li>
                        <li className="sideMenu-item">  Gallery </li>
                        <li className="sideMenu-item">  Favorites </li>
                        <li className="sideMenu-item">  Check List </li>
                        <li className="sideMenu-item">  Trip Planning</li>
                        <div className="sideMenu-img colibri"></div>
                        <div className="sideMenu-bg "></div>
                    </ul>
                </div>
            </div>
        )
    }
}
export default SideMenu;