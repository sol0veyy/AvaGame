import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import "../css/reg-auth.css"
import { loginIn, registration } from "../http/userAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite"

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');

    const click = async () => {
        try {
            if (isLogin) {
                await loginIn(login, password);
            } else {
                await registration(login, email, password);
            }
            setError('');
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)
        } catch (e) {
            setError(e.response.data.message);
        }
    }

    const clearError = () => {
        setError('');
    }

    return (
        <div className="main">
            <div className="auth">
                <h1>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h1>
                <form action="#" method="post">
                    <input
                        required
                        type="text"
                        className="form-control"
                        name="login"
                        placeholder="Логин"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    {!isLogin ?
                        <input
                            required
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Почта"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        :
                        ''
                    }
                    <input
                        required
                        type="password"
                        className="form-control"
                        name="pass"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error ?
                        <div style={{color: "red", marginTop: "5px"}}>
                            {error}
                        </div>
                        :
                        ''
                    }
                    <input
                        type="button"
                        value={isLogin ? 'вход' : 'зарегистрироваться'}
                        onClick={click}
                    />
                </form>
                {isLogin ?
                    <p>
                        У вас нет аккаунта? - <NavLink onClick={clearError} to={REGISTRATION_ROUTE}>зарегистрируйтесь</NavLink>!
                    </p>
                    :
                    <p>
                        У вас есть аккаунт? - <NavLink onClick={clearError} to={LOGIN_ROUTE}>авторизируйтесь</NavLink>!
                    </p>
                }
            </div>
        </div>
    )
});

export default Auth;