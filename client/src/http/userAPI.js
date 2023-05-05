import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (login, email, password) => {
    const {data} = await $host.post('api/user/registration', {login, email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const loginIn = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const changeSettings = async (settings) => {
    const {data} = await $authHost.post('api/user/settings', settings);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}