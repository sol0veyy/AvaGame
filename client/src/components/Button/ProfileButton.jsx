import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import "./button.css"
import jwt_decode from "jwt-decode"

const ProfileButton = () => {
    const { user } = useContext(Context);

    const infoUser = jwt_decode(localStorage.getItem('token'))
    const colAvatars = infoUser.publications;

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

      let textColAvatars = colAvatars + " " + getNoun(colAvatars, "аватарка", "аватарки", "аватарок");

    // if (colAvatars === 0 || colAvatars >= 5) {
    //     textColAvatars = colAvatars + " аватарок";
    // } else if (colAvatars % 10 === 1) {
    //     textColAvatars = colAvatars + " аватарка";
    // } else {
    //     textColAvatars = colAvatars + " аватарки";
    // }  



    return (
        <div className="buttonsRight">
            {user.isAuth ?
                <div className="blockRightProfile">
                    <NavLink to={PROFILE_ROUTE}>
                        <img src={infoUser.img ? process.env.REACT_APP_API_URL + infoUser.img : "nonAvatar.jpg"} alt="profile" />
                    </NavLink>
                    <div className="info">
                        <span className="login">{infoUser.login}</span>
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
}

export default ProfileButton;