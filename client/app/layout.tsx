'use client'

import './globals.css';
import { IUser, IUserStore, UserStore } from "./store/UserStore";
import { AvatarsStore, IAvatarsStore } from "./store/AvatarStore";
import { createContext, useEffect } from "react";
import { check } from '../src/http/userAPI';

interface IContext {
    user: IUserStore;
    avatars: IAvatarsStore;
}

const user: IUserStore = new UserStore();
const avatars: IAvatarsStore = new AvatarsStore();

export const Context = createContext<IContext>({user: user, avatars: avatars})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        check()
            .then((data: IUser) => {
                user.setUser(data);
                user.setIsAuth(true);
            })
            .catch(error => console.log(error))
    }, [user.isAuth]);

    return (
        <html lang="en">
            <body data-bs-theme="dark">
                <Context.Provider value={{
                    user,
                    avatars
                }}>
                    {children}
                </Context.Provider>
            </body>
        </html>
    )
}