import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IViewProfile } from './ViewProfile';
import { MAIN_ROUTE } from '../../../utils/consts';

const ProfileInfo = ({ profileUser }: IViewProfile) => {
    const navigate = useNavigate();

    return (
        <div className="profileInfo">
            <div className="infoBlock">
                <img
                    src={process.env.REACT_APP_API_URL + profileUser.img}
                    className="avatar"
                    alt="avatar"
                />
                <span className="nickname">{profileUser.login}</span>
                <span className="col-avatar">
                    Количество аватарок - {profileUser.publications}
                </span>
                <button
                    className="w-75 btn btn-outline-primary"
                    onClick={() => navigate(MAIN_ROUTE)}
                >
                    Главная
                </button>
            </div>
        </div>
    );
};

export default ProfileInfo;