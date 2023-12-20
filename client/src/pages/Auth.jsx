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
    const [passView, setPassView] = useState(false);
    const [typePass, setTypePass] = useState("password");

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
            window.location.reload();
        } catch (e) {
            setError(e.response.data.message);
        }
    }

    const correctInput = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    const clearError = () => {
        setError('');
    }

    const passOnView = () => {
        if (passView) {
            setPassView(false);
            setTypePass("password");
        } else {
            setPassView(true);
            setTypePass("text");
        }
    }

    return (
        <div className="main position-relative">
            <div className="w-25 position-absolute top-50 start-50 translate-middle">
                <h1 className="text-center mb-4">{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
                <form className="row g-3 mb-4">
                    <div className="col-12">
                        <input
                                required
                                type="text"
                                className="form-control"
                                name="login"
                                placeholder="Логин"
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                onKeyDown={e => correctInput(e)}
                        />
                    </div>
                    {!isLogin ?
                        <div className="col-12">
                            <input
                                required
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Почта"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => correctInput(e)}
                            />
                        </div>
                        :
                        ''
                    }
                    <div className="password__input col-12">
                        <input
                            required
                            type={typePass}
                            className="form-control"
                            name="pass"
                            placeholder="Пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => correctInput(e)}
                        />
                        <img onClick={passOnView} src={passView ? 'img/no-view.svg' : 'img/view.svg'} className="password__control" alt="view"></img>
                    </div>
                    {error ?
                        <div className="text-center text-danger">
                            {error}
                        </div>
                        :
                        ''
                    }
                    <div className="col-4">
                        <NavLink to={MAIN_ROUTE}>
                            <a className="form-control btn btn-outline-secondary">
                                Главная
                            </a>
                        </NavLink>
                    </div>
                    <div className="col-8">
                        <input
                            type="button"
                            value={isLogin ? 'вход' : 'зарегистрироваться'}
                            onClick={click}
                            className="form-control btn btn-success"
                        />
                    </div>
                </form>
                {isLogin ?
                    <p className="text-center">
                        У вас нет аккаунта? - <NavLink className="text-decoration-none" onClick={clearError} to={REGISTRATION_ROUTE}>зарегистрируйтесь</NavLink>
                    </p>
                    :
                    <p className="text-center">
                        У вас есть аккаунт? - <NavLink className="text-decoration-none" onClick={clearError} to={LOGIN_ROUTE}>авторизируйтесь</NavLink>
                    </p>
                }
            </div>
        </div>
    )
});

export default Auth;