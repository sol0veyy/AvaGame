import React from "react";
import logo from '../img/logo.svg'
import Search from "./Header/Search";
import ThemeButton from "./Button/ThemeButton";
import ProfileButton from "./Button/ProfileButton";

const Header = () => {
    return (
        <header>
            <img src={logo} className="logo" alt="AvaGame"/>
            <Search />
            <ThemeButton />
            <ProfileButton />
        </header>
    )
}

export default Header;