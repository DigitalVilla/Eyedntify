import React, { Component } from 'react'
import SearchBar from './SearchBar'
import Icon from '../Icon'
import SideMenu from './SideMenu'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../redux/actions/act_authorize'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {
    state = {
        showMenu: false
    }

    openMenu = (e) => {
        if (e.target.className === "title" && this.state.showMenu === false) 
            return
        this.setState({ showMenu: !this.state.showMenu })
        let container = document.querySelector(".menu-container");
        container.children[0].classList.toggle("fadeOut")
        container.children[1].classList.toggle("fadeInRight")
        container.children[1].classList.toggle("fadeOutRight")
        this.animate(0);
        let time = this.state.showMenu ? 400 : 0;
        setTimeout(function () {
            container.classList.toggle("hide");
        }, time)
    }

    animate = (a) => {
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

    btnHandler =(btn)=> {
        switch (btn) {
            case "logout":
            this.props.logoutUser();
                
                break;
        
            default:
                break;
        }
        console.log(btn);
        
    }


    render() {
        const btns = [
            {value:"home",icon:"send" },
            {value:"profile",icon:"user-cirlce" },
            {value:"settings",icon:"settings" },
            {value:"logout",icon:"exit" }];

        return (
            <nav className="myNav-bar" >
                <div className="myNav-container">
                    <Link to="/camera">
                        <Icon icon="camera" size="3rem" />
                    </Link>
                    <SearchBar action={this.openMenu} placeholder="Search by..." />
                    <Icon icon="menu" size="2.7rem" action={this.openMenu} />
                </div>
                <SideMenu buttons={btns} btnHandler={this.btnHandler}
                    toShow={this.state.showMenu} closeMenu={this.openMenu} />
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
  });

export default connect(mapStateToProps, { logoutUser })(Navbar);