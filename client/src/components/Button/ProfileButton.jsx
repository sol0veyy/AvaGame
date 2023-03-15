import React from "react";
import { NavLink } from "react-router-dom";
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import "./button.css"

const ProfileButton = () => {
    return (
        <div className="profile">
            <NavLink to={REGISTRATION_ROUTE}>
                <button>Регистрация</button>
            </NavLink>
            <NavLink to={LOGIN_ROUTE}>
                <button>Вход</button>
            </NavLink>
        </div>
    )
}

export default ProfileButton;