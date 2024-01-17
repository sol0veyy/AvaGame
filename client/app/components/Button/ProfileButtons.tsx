import React, { useContext, useEffect, useState } from "react";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "../../../src/utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../../layout";
import Link from "next/link";

const ProfileButton = observer(() => {
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
        setTextColAvatars(user.user['publications'] + " " + getNoun(user.user['publications'], "аватарка", "аватарки", "аватарок"));
        setUserImg(user.user['img']);
        setLogin(user.user['login']);
    }, [user])

    return (
        <>
            {user.isAuth ?
                <div className="col d-flex justify-content-end gap-2">
                    <Link href={PROFILE_ROUTE}>
                        <img className="rounded-circle" width={50} src={userImg ? process.env.REACT_APP_API_URL + userImg : "img/nonAvatar.jpg"} alt="profile" />
                    </Link>
                    <div className="d-flex flex-column">
                        <span>{login}</span>
                        <span className="text-white-50">{textColAvatars}</span>
                    </div>
                </div>
                :
                <div className=" col d-flex gap-2 justify-content-end">
                    <Link href={REGISTRATION_ROUTE}>
                        <button className="btn btn-outline-secondary">Регистрация</button>
                    </Link>
                    <Link href={LOGIN_ROUTE}>
                        <button className="btn btn-primary">Вход</button>
                    </Link>
                </div>
            }
        </>
    )
})

export default ProfileButton;