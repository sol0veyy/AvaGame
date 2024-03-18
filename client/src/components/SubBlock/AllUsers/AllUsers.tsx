import React, { useEffect, useState } from 'react';
import UserBlock from '../UserBlock/UserBlock';
import { getAllUsers, getAllUsersByFilter } from '../../../http/userAPI';
import { IUser } from '../../../store/UserStore';
import { ISubBlockContent } from '../SubBlock';

const AllUsers = ({ findText }: ISubBlockContent) => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (findText === '') {
            getAllUsers().then((data) => {
                setUsers(data.users);
            });
        } else {
            getAllUsersByFilter(findText)
                .then(users => {
                    setUsers(users);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [findText]);

    return (
        <>
            {users.map((user) => (
                <UserBlock key={user.id} otherUser={user} />
            ))}
        </>
    );
};

export default AllUsers;