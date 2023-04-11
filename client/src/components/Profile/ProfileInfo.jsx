import React from "react";
import "./profile.css";
import avatar from "../../img/ava.jpg";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../utils/consts";

const ProfileInfo = () => {
    const navigate = useNavigate();

    return (
        <div className="profileInfo">
            <div className="infoBlock">
                    <img src={avatar} alt="avatar" />
                    <span className="nickname">sol0vey</span>
                    <span className="col-avatar">40 опубликованных аватарок</span>
                    <button className="backMain" onClick={() => navigate(MAIN_ROUTE)}>Главная</button>
                    <button className="uploadAva">Опубликовать аватарку</button>
                    <button>Изменить профиль</button>
                    <button onClick={() => navigate(LOGIN_ROUTE)}>Выйти с аккаунта</button>
            </div>
        </div>
    )
}

export default ProfileInfo;