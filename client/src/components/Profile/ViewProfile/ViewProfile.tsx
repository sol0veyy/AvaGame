import React from 'react';
import { IUser } from '../../../store/UserStore';
import ProfileInfo from './ProfileInfo';

export interface IViewProfile {
    profileUser: IUser;
}

const ViewProfile = ({ profileUser }: IViewProfile) => {
    return (
        <>
            <ProfileInfo profileUser={profileUser}  />
        </>
    );
};

export default ViewProfile;