import React, { useContext } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const ProfileInfo = observer(({ setUploadActive, setSettingsActive }) => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(LOGIN_ROUTE)
    }

    return (
        <div className="profileInfo">
            <div className="infoBlock">
                    <img 
                        src={user.user['img'] ? process.env.REACT_APP_API_URL + user.user['img'] : `img/nonAvatar.jpg`}
                        className="avatar"
                        alt="avatar"    
                    />
                    <span className="nickname">{user.user['login']}</span>
                    <span className="col-avatar">Количество аватарок - {user.user['publications']}</span>
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
})

export default ProfileInfo;