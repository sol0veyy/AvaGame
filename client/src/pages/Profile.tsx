import React, { useContext, useEffect, useState } from "react";
import "../css/profile.scss";
import UserAvatars from "../components/Avatars/UserAvatars/UserAvatars";
import { clickDownload } from "../components/Avatars/functions";
import { useParams } from "react-router-dom";
import { getUserByLogin } from "../http/userAPI";
import { IUser } from "../store/UserStore";
import { Context } from "..";
import UserProfile from "../components/Profile/UserProfile/UserProfile";
import ViewProfile from "../components/Profile/ViewProfile/ViewProfile";

const Profile = () => {
    const {user} = useContext(Context);
    const {login} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [profileUser, setProfileUser] = useState<IUser>();

    useEffect(() => {
        getUserByLogin(login)
            .then(user => {
                setProfileUser(user);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="profile">
            {!isLoading ? (
                <>
                    {user.id === profileUser.id ? <UserProfile /> : <ViewProfile profileUser={profileUser} />}
                    <UserAvatars profileUser={profileUser} clickDownload={clickDownload} />
                </>
            ) : null}
        </div>
    );
};

export default Profile;