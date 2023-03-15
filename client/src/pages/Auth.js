import React from "react";
import {NavLink, useLocation} from "react-router-dom"
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts"
import "../css/reg-auth.css"

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)

    return (
        <div className="main">
            <div className="auth">
                <h1>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h1>
                <form action="#" method="post">
                    <input required type="text" className="form-control" name="login" placeholder="Логин" />
                    {!isLogin ? 
                    <input required type="email" className="form-control" name="email" placeholder="Почта" /> 
                    :
                    ''
                    }
                    <input required type="password" className="form-control" name="pass" placeholder="Пароль" />
                    <input type="submit" value={isLogin ? 'вход' : 'зарегистрироваться'} />
                </form>
                {isLogin ?
                    <p>
                        У вас нет аккаунта? - <NavLink to={REGISTRATION_ROUTE}>зарегистрируйтесь</NavLink>!
                    </p>
                    :
                    <p>
                        У вас есть аккаунт? - <NavLink to={LOGIN_ROUTE}>авторизируйтесь</NavLink>!
                    </p>
                }
            </div>
        </div>
    )
}

export default Auth;