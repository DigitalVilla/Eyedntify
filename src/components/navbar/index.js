import React, { Component } from 'react'
import SearchBar from './SearchBar'
import NavBtn from './NavBtn'

class Header extends Component {
    render() {
        return (
            <header class="myNav-bar frameIt" >
                <div className="myNav-container">
                    <NavBtn icon="-home"/>
                    <SearchBar placeholder="Search by..." />
                    <NavBtn icon="-menu"/>
                </div>
            </header>
        )
    }
}
export default Header;