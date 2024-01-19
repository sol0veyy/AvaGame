'use client'

import "../../src/css/reg-auth.css"
import { useContext, useState } from "react";
import { Context } from "../layout"
import { loginIn } from "../../src/http/userAPI";
import { MAIN_ROUTE, REGISTRATION_ROUTE } from "../../src/utils/consts";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()

    const { user } = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passView, setPassView] = useState(false)
    const [typePass, setTypePass] = useState("password")

    const click = async () => {
        try {
            await loginIn(login, password);
            setError('');
            user.setIsAuth(true)
            router.push(MAIN_ROUTE)
            // window.location.reload();
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
                <h1 className="text-center mb-4">Авторизация</h1>
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
                        <Link href={MAIN_ROUTE} className="form-control btn btn-outline-secondary">
                            Главная
                        </Link>
                    </div>
                    <div className="col-8">
                        <input
                            type="button"
                            value='вход'
                            onClick={click}
                            className="form-control btn btn-success"
                        />
                    </div>
                </form>
                <p className="text-center">
                    У вас нет аккаунта? - <Link className="text-decoration-none" onClick={clearError} href={REGISTRATION_ROUTE}>зарегистрируйтесь</Link>
                </p>
            </div>
        </div>
    )
}