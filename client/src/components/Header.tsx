import React from "react";
import Search from "../../app/components/Search/Search";
import ProfileButton from "./Button/ProfileButton";

const Header = ({textInput, setText}) => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand col-2" href="#">AvaGame</a>
                <Search textInput={textInput} setText={setText} />
                <ProfileButton />
            </div>
        </nav>
    )
}

export default Header;