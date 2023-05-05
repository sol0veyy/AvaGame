import React, { useContext } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import jwt_decode from 'jwt-decode'

const ProfileInfo = ({ setUploadActive, setSettingsActive }) => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const infoUser = jwt_decode(localStorage.getItem('token'))

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }

    return (
        <div className="profileInfo">
            <div className="infoBlock">
                    <img 
                        src={infoUser.img ? process.env.REACT_APP_API_URL + infoUser.img : `nonAvatar.jpg`}
                        className="avatar"
                        alt="avatar"    
                    />
                    <span className="nickname">{infoUser.login}</span>
                    <span className="col-avatar">{infoUser.publications} опубликованных аватарок</span>
                    <button className="backMain" onClick={() => navigate(MAIN_ROUTE)}>Главная</button>
                    <button
                        onClick={() => setUploadActive(true)}
                    >
                        Опубликовать аватарку
                    </button>
                    <button
                        onClick={() => setSettingsActive(true)}
                    >
                        Настройки профиля
                    </button>
                    <button onClick={() => logOut()}>Выйти с аккаунта</button>
            </div>
        </div>
    )
}

export default ProfileInfo;