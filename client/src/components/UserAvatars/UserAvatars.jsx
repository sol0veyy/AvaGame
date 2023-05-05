import React, { useContext, useEffect } from 'react';
import { getUserAvatars } from '../../http/avatarsAPI';
import { Context } from '../..';
import { toJS } from 'mobx';
import Avatar from '../Avatar/Avatar';
import jwtDecode from 'jwt-decode';
import { observer } from 'mobx-react-lite';
import "./userAvatars.css";

const UserAvatars = observer(() => {
    const {avatar} = useContext(Context)
    const infoUser = jwtDecode(localStorage.getItem("token"));
    const userId = infoUser.id;

    useEffect(() => {
        getUserAvatars(userId).then(data => avatar.setUserAvatars(data));
    }, [avatar, userId])
    
    const allAvatars = toJS(avatar.userAvatars);

    return (
        <div className="avatarsBlockProfile">
            {allAvatars.map(avatar => 
                <Avatar 
                    avatar={avatar}
                    key={avatar.id}
                />
            )}
        </div>
    );
});

export default UserAvatars;