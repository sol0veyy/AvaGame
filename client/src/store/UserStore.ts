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

const DefaultIUser = {
    id: 0,
    login: '',
    email: '',
    img: '',
    publications: 0,
    role: ''
}

class UserStore {
    isAuth: boolean;
    user: IUser;

    constructor() {
        this.isAuth = false;
        this.user = DefaultIUser;
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
    UserStore
}
