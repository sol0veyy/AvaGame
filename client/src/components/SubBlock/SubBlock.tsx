import React, { useContext } from "react";
import { useEffect, useState } from "react";
import "./SubBlock.scss";
import { getAllUsers } from "../../http/userAPI";
import { IUser } from "../../store/UserStore";
import UserBlock from "./UserBlock/UserBlock";
import { getAllUserSubs } from "../../http/followerAPI";
import { Context } from "../..";

const SubBlock = () => {
    const {user} = useContext(Context);

    const [users, setUsers] = useState<IUser[]>([]);
    const [isActiveBlockMySubs, setIsActiveBlockMySubs] = useState(true);
    const [isActiveBlockAllUsers, setIsActiveBlockAllUsers] = useState(false);

    useEffect(() => {
        updateUserList();
    }, [isActiveBlockMySubs]);

    const openBlockMySubs = () => {
        setIsActiveBlockMySubs(true);
        setIsActiveBlockAllUsers(false);
    };

    const openBlockAllUsers = () => {
        setIsActiveBlockMySubs(false);
        setIsActiveBlockAllUsers(true);
    };

    const findUser = (findText: string) => {
        if (findText === '') return updateUserList();

        const regex = new RegExp(findText, 'i');
        setUsers(users.filter(user => regex.test(user.login)));
    };

    const updateUserList = () => {
        if (isActiveBlockMySubs) {
            getAllUserSubs(user.id).then((users) => {
                setUsers(users);
            });
        } 
        if (isActiveBlockAllUsers) {
            getAllUsers().then((data) => {
                setUsers(data.users);
            });
        }
    };

    return (
        <div className="sub__block d-flex flex-column gap-3 bg-body-tertiary">
            <div className="d-flex gap-3">
                <button
                    className={`${isActiveBlockMySubs ? 'btn__active' : ''}`}
                    onClick={openBlockMySubs}
                >Мои подписки</button>
                <button 
                    className={`${isActiveBlockAllUsers ? 'btn__active' : ''}`}
                    onClick={openBlockAllUsers}
                >Все пользователи</button>
            </div>
            <form className="d-flex" role="search">
                <input 
                    className="form-control" type="search" placeholder="Поиск" aria-label="Search" 
                    onChange={(event) => findUser(event.target.value)}
                />
            </form>
            <div>
                {users.map((user) => (
                    <UserBlock key={user.id} otherUser={user} />
                ))}
            </div>
        </div>
    );
};

export default SubBlock;