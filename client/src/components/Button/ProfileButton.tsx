import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";

import "./profileButton.scss";

interface IProfileButton {
    className?: string;
}

const ProfileButton = observer(({ className }: IProfileButton) => {
    const { user } = useContext(Context);
 
    const [userImg, setUserImg] = useState('');
    const [login, setLogin] = useState('');
    const [textColAvatars, setTextColAvatars] = useState('');

    const getNoun = (number: number, one: string, two: string, five: string) => {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
          return five;
        }
        n %= 10;
        if (n === 1) {
          return one;
        }
        if (n >= 2 && n <= 4) {
          return two;
        }
        return five;
    }

    useEffect(() => {
        if (user.isAuth) {
            setTextColAvatars(user.publications + " " + getNoun(user.publications, "аватарка", "аватарки", "аватарок"));
            setUserImg(user.img);
            setLogin(user.login);
        }
    }, [user])

    return (
        <div className={`${className} col`}>
            {user.isAuth ?
                <div className="d-flex justify-content-lg-end">
                    <NavLink to={PROFILE_ROUTE}>
                        <img className="rounded-circle" width={50} src={userImg ? process.env.REACT_APP_API_URL + userImg : "img/nonAvatar.jpg"} alt="profile" />
                    </NavLink>
                    <div className="d-flex justify-content-around flex-column mx-2">
                        <span>{login}</span>
                        <span className="col__avatars text-white-50">{textColAvatars}</span>
                    </div>
                </div>
                :
                <div className="d-flex gap-2 justify-content-lg-end">
                    <NavLink to={REGISTRATION_ROUTE}>
                        <button className="btn btn-outline-secondary">Регистрация</button>
                    </NavLink>
                    <NavLink to={LOGIN_ROUTE}>
                        <button className="btn btn-primary">Вход</button>
                    </NavLink>
                </div>
            }
        </div>
    )
})

export default ProfileButton;