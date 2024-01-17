import { makeAutoObservable } from 'mobx'

interface IUserStore {
    isAuth: boolean;
    user: IUser;
    setIsAuth: (bool: boolean) => void;
    setUser: (user: IUser) => void;
}

interface IUser {
    id: number;
    login: string;
    email: string;
    img: string;
    publications: number;
    role: string;
}

const UserDefault: IUser = {
    id: 0,
    login: '',
    email: '',
    img: '',
    publications: 0,
    role: 'anonymous'
}

class UserStore {
    isAuth: boolean;
    user: IUser;

    constructor() {
        this.isAuth = false;
        this.user = UserDefault;
        makeAutoObservable(this)  
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool
    }
    setUser(user: IUser) {
        this.user = user
    }
}

export {
    IUserStore,
    IUser,
    UserStore,
    UserDefault
}
