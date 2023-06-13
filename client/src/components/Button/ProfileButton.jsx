import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import "./button.css"
import { observer } from "mobx-react-lite";

const ProfileButton = observer(() => {
    const { user } = useContext(Context);
 
    const [userImg, setUserImg] = useState('');
    const [login, setLogin] = useState('');
    const [textColAvatars, setTextColAvatars] = useState('');

    const getNoun = (number, one, two, five) => {
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
        setTextColAvatars(user.user['publications'] + " " + getNoun(user.user['publications'], "аватарка", "аватарки", "аватарок"));
        setUserImg(user.user['img']);
        setLogin(user.user['login']);
    }, [user])

    return (
        <div className="buttonsRight">
            {user.isAuth ?
                <div className="blockRightProfile">
                    <NavLink to={PROFILE_ROUTE}>
                        <img src={userImg ? process.env.REACT_APP_API_URL + userImg : "img/nonAvatar.jpg"} alt="profile" />
                    </NavLink>
                    <div className="info">
                        <span className="login">{login}</span>
                        <span className="colAvatar">{textColAvatars}</span>
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
})

export default ProfileButton;