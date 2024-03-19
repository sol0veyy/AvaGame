import React, { useContext, useEffect, useState } from 'react';
import UserBlock from '../UserBlock/UserBlock';
import { getAllUserSubs, getAllUserSubsByFilter } from '../../../http/Follower/followerAPI';
import { IUser } from '../../../store/UserStore';
import { Context } from '../../..';
import { ISubBlockContent } from '../SubBlock';

const AllSubs = ({ findText }: ISubBlockContent) => {
    const {user} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (findText === '') {
            getAllUserSubs(user.id).then((users) => {
                setUsers(users);
            });
        } else {
            getAllUserSubsByFilter(findText)
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

export default AllSubs;