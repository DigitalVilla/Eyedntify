import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Icon from '../../utils/Icon'
import SideMenu from './SideMenu'

class Header extends Component {
    state = {
        showMenu: false,
        indx: "",
    }

    openMenu = (e) => {
        this.setState({ showMenu: !this.state.showMenu })
        let container = document.querySelector(".menu-container");
        container.children[0].classList.toggle("fadeOut")
        container.children[1].classList.toggle("fadeInRight")
        container.children[1].classList.toggle("fadeOutRight")
        this.animate(0);
        let time = this.state.showMenu ? 500 : 0;
        setTimeout(function () {
            container.classList.toggle("hide");
        }, time)
    }

    animate(a) {
        const image = document.querySelector(".sideMenu-img");
        
        // const {indx} = this.state;
        for (let i = 1; i <= 5; i++) {
            setTimeout(function (a) {
                    console.log(i);
                    image.classList.add("colibri" + i);
                    1 === i && (image.style.marginTop = "-4.3rem");
                    5 === i && (image.style.marginTop = "-4rem");
                    image.classList.remove("colibri" + (i-1));
                }, a += 100)
            }
            image.classList.remove("colibri5");
            image.classList.add("colibri");
    }


    render() {
        return (
            <nav className="myNav-bar" >
                <div className="myNav-container">
                    <Icon icon="camera" size="3rem"/>
                    <SearchBar placeholder="Search by..." />
                    <Icon icon="menu" size="2.7rem" action={this.openMenu} />
                </div>
                <SideMenu closeMenu={this.openMenu}/>
            </nav>
        )
    }
}
export default Header;