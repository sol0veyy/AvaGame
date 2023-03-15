import React from "react";
import logo from '../img/logo.svg'
import Search from "./Search/Search";
import ProfileButton from "./Button/ProfileButton";

const Header = () => {
    return (
        <header>
            <img src={logo} className="logo" alt="AvaGame"/>
            <Search />
            <ProfileButton />
        </header>
    )
}

export default Header;