import React from "react";
import { NavLink } from "react-router-dom";
import ava from "../../img/ava.jpg"
import { REGISTRATION_ROUTE } from "../../utils/consts";

const ProfileButton = () => {
    return (
        <div className="profile">
            <NavLink to={REGISTRATION_ROUTE}>
                <img src={ava} alt="profile" />
            </NavLink>
        </div>
    )
}

export default ProfileButton;