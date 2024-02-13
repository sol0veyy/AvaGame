import React from "react";
import ProfileButton from "./Button/ProfileButton";
import Search from "./Search/Search";

const Header = ({textInput, setText}) => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <p className="navbar-brand col-2 mb-0">AvaGame</p>
                <Search textInput={textInput} setText={setText} />
                <ProfileButton />
            </div>
        </nav>
    );
}

export default Header;