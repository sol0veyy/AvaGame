import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import ava from "../../img/ava.jpg"
import { REGISTRATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import "./button.css"

const ProfileButton = () => {
    const { user } = useContext(Context)

    return (
        <div className="buttonsRight">
            {user.isAuth ?
                <div className="blockRightProfile">
                    <NavLink to={PROFILE_ROUTE}>
                        <img src={ava} alt="profile" />
                    </NavLink>
                    <div className="info">
                        <span className="login">sol0vey</span>
                        <span className="colAvatar">40 аватарок</span>
                    </div>
                </div>
                :
                <div>
                    <NavLink to={REGISTRATION_ROUTE}>
                        <button>Регистрация</button>
                    </NavLink>
                    <NavLink to={LOGIN_ROUTE}>
                        <button>Вход</button>
                    </NavLink>
                </div>
            }
        </div>
    )
}

export default ProfileButton;