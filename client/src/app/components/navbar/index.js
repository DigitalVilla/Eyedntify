import React, { Component } from 'react'
import SearchBar from './SearchBar'
// import Icon from '../Icon'
import SideMenu from './SideMenu'

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
        // if (e.target.className === "title" && this.state.showMenu === false) 
        // return
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
       
        if (showMenu) this.animate(0);
        let time = showMenu ? 400 : 0;
        setTimeout(function () {
            container.classList.toggle("hide");
        }, time)
    }
    // animate = (a) => {
    //     const image = document.querySelector(".sideMenu-img");
    //     for (let i = 1; i <= 5; i++) {
    //         setTimeout(function (a) {
    //             image.classList.add("colibri" + i);
    //             1 === i && (image.style.marginTop = "-4.3rem");
    //             image.classList.remove("colibri" + (i - 1));
    //             5 === i && (image.style.marginTop = "-4rem")
    //         }, a += 100)
    //     }
    //     image.style.marginTop = "-3.8rem";
    // }
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
                this.props.logoutUser();
                this.props.clearProfile();
                this.props.clearPOSTS();
                break;

            default:
                break;
        }
        // console.log(btn);
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
                    {/* <Link to="/camera">
                        <Icon icon="camera" size="3rem" />
                    </Link> */}
                    <SearchBar action={this.openMenu} placeholder="Search by..." />
                    {/* <Icon icon="menu" size="2.7rem" action={this.openMenu} /> */}
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