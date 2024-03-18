import React, { useContext } from 'react';
import '../profile.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';

interface IPropsProfileInfo {
    setUploadActive: (active: boolean) => void;
	setSettingsActive: (active: boolean) => void;
}

const ProfileInfo = observer(({ setUploadActive, setSettingsActive }: IPropsProfileInfo) => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    const logOut = () => {
        user.logOut();
        localStorage.removeItem('token');
        navigate(MAIN_ROUTE);
    };

    return (
        <div className="profileInfo">
            <div className="infoBlock">
                <img
                    src={process.env.REACT_APP_API_URL + user.img}
                    className="avatar"
                    alt="avatar"
                />
                <span className="nickname">{user.login}</span>
                <span className="col-avatar">
                    Количество аватарок - {user.publications}
                </span>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => navigate(MAIN_ROUTE)}
                >
                    Главная
                </button>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => setUploadActive(true)}
                >
                    Опубликовать аватарку
                </button>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => setSettingsActive(true)}
                >
                    Настройки профиля
                </button>
                <button
                    className="w-75 btn btn-outline-danger"
                    onClick={() => logOut()}
                >
                    Выйти с аккаунта
                </button>
            </div>
        </div>
    );
});

export default ProfileInfo;
