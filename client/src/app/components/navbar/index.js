import React, { Component } from 'react'
import SideMenu from './SideMenu'
import logo from '../../../img/icon.png'
import { logoutUser } from '../../redux/actions/act_authorize'
import { clearProfile } from '../../redux/actions/act_profile'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: false,
            still: 'colibri',
            margin: "-3.8rem"
        }
    }

    openMenu = (e) => {
        const { showMenu } = this.state;
        setTimeout(() => {
            if (this.props.toMute) // mute a parent component 
                this.props.toMute()
        }, 100);

        if (showMenu) { //wait to close
            this.animateMenu(showMenu)
            setTimeout(() => {
                this.setState({ showMenu: !this.state.showMenu })
            }, 400)
        }
        else { // wait to render 
            this.setState({ showMenu: !this.state.showMenu }, () => {
                this.animateMenu(showMenu)
            })
        }
    }

    animateMenu = (showMenu) => {
        let container = document.querySelector(".menu-container");
        container.children[0].classList.toggle("fadeOut")
        container.children[1].classList.toggle("fadeInRight")
        container.children[1].classList.toggle("fadeOutRight")
        if (!showMenu) this.animate(0);
        let time = showMenu ? 400 : 0;
        setTimeout(function () {
            container.classList.toggle("hide");
        }, time)
    }

    animate = (a) => {
        for (let i = 1; i <= 5; i++) {
            setTimeout((a) => {
                let still = "colibri" + i;
                let margin = 1 === i ? "-4.3rem"
                    : 5 === i ? "-4rem" : this.state.margin;
                this.setState({ still, margin })
            }, a += 100)
        }
        this.setState({ still: 'colibri', margin: "-3.8rem" })
    }

    btnHandler = (btn) => {
        switch (btn) {
            case "logout":
                logoutUser();
                clearProfile();
                break;

            default:
                break;
        }
    }

    render() {
        const btns = [
            { value: "home", icon: "camera" },
            { value: "profile", icon: "user" },
            { value: "finder", icon: "search" },
            { value: "settings", icon: "settings" },
            { value: "logout", icon: "exit" }];

        const animation = {
            marginTop: this.state.margin,
            still: this.state.still
        }

        return (
            <nav className="myNav-bar" >
                <div className="myNav-container">
                    <div className="title" onClick={this.openMenu.bind(this)}>
                        <img className="title" src={logo} alt="logo" />
                        <span> Eyedntify</span>
                    </div>
             
                </div>
                {this.state.showMenu &&
                    <SideMenu buttons={btns} btnHandler={this.btnHandler} animation={animation}
                        toShow={this.state.showMenu} animate={this.animate} closeMenu={this.openMenu} />
                }
            </nav>
        )
    }
}

export default Navbar;