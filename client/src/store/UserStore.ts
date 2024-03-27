// import { makeAutoObservable } from 'mobx';
// import { IAvatar } from './AvatarStore';

// interface IUserStore extends IUser {
//     isAuth: boolean;
//     avatars: IAvatar[];
//     setIsAuth: (bool: boolean) => void;
//     setUser: (user: IUser) => void;
//     logOut: () => void;
// }

// interface IUser {
//     id: number;
//     login: string;
//     email: string;
//     img: string;
//     publications: number;
//     role: string;
// }

// const user_default: IUser = {
//     id: 0,
//     login: '',
//     email: '',
//     img: '',
//     publications: 0,
//     role: '',
// };

// class UserStore {
//     isAuth = false;
//     id = 0;
//     login = '';
//     email = '';
//     img = '';
//     publications = 0;
//     role = '';
//     avatars: IAvatar[] = [];

//     constructor() {
//         makeAutoObservable(this);  
//     }

//     setIsAuth(bool: boolean) {
//         this.isAuth = bool;
//     }
//     setUser(user: IUser) {
//         this.id = user.id;
//         this.login = user.login;
//         this.email = user.email;
//         this.img = user.img;
//         this.publications = user.publications;
//         this.role = user.role;
//     }

//     logOut() {
//         this.isAuth = false;
//         this.id = user_default.id;
//         this.login = user_default.login;
//         this.email = user_default.email;
//         this.img = user_default.img;
//         this.publications = user_default.publications;
//         this.role = user_default.role;
//     }
// }

// export {
//     IUserStore,
//     IUser,
//     UserStore
// };
