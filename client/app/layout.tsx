'use client'

import './globals.css';
import { IUser, IUserStore, UserStore } from "./store/UserStore";
import { AvatarsStore, IAvatarsStore } from "./store/AvatarStore";
import { createContext, useEffect, useState } from "react";
import { check } from '../src/http/userAPI';
import Loading from './loading';

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        check()
            .then((data: IUser) => {
                user.setUser(data);
                user.setIsAuth(true);
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }, [user.isAuth]);

    if (isLoading) {
        return Loading();
    }

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