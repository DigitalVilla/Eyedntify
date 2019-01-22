import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Icon from '../../utils/Icon'
import SideMenu from './SideMenu'

class Header extends Component {
    state = {
        showMenu: false
    }

    openMenu = (e) => {
        let container = document.querySelector(".menu-container");
        container.children[0].classList.toggle("fadeOut")
        container.children[1].classList.toggle("fadeInRight")
        container.children[1].classList.toggle("fadeOutRight")
        this.animate(0);
        let time = this.state.showMenu ? 400 : 0;
        setTimeout(function () {
            container.classList.toggle("hide");
        }, time)
        this.setState({ showMenu: !this.state.showMenu })
    }

    animate = (a) =>{
        const image = document.querySelector(".sideMenu-img");
            for (let i = 1; i <= 5; i++) {
                setTimeout(function (a) {
                    image.classList.add("colibri" + i);
                    1 === i && (image.style.marginTop = "-4.3rem");
                    image.classList.remove("colibri" + (i - 1));
                    5 === i && (image.style.marginTop = "-4rem")
                }, a += 100)
            }
            image.style.marginTop = "-3.8rem";
    }

    render() {
        return (
            <nav className="myNav-bar" >
                <div className="myNav-container">
                    <Icon icon="camera" size="3rem" />
                    <SearchBar placeholder="Search by..." />
                    <Icon icon="menu" size="2.7rem" action={this.openMenu} />
                </div>
                <SideMenu toShow={this.state.showMenu}closeMenu={this.openMenu} />
            </nav>
        )
    }
}
export default Header;