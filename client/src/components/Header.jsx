import React from "react";
import logo from '../img/logo.svg'
import Search from "./Search/Search";
import ProfileButton from "./Button/ProfileButton";

const Header = ({textInput, setText}) => {
    return (
        <header>
            <img src={logo} className="logo" alt="AvaGame"/>
            <Search textInput={textInput} setText={setText} />
            <ProfileButton />
        </header>
    )
}

export default Header;