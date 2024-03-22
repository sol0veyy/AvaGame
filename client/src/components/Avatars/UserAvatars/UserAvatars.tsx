import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import Avatar from '../Avatar/Avatar';
import './userAvatars.scss';
import ModalAccept from '../../Modal/ModalAccept';
import { observer } from 'mobx-react-lite';
import { IAvatar } from '../../../store/AvatarStore';
import { getUserAvatars } from '../../../http/avatarsAPI';
import { IUser } from '../../../store/UserStore';

interface IPropsUserAvatars {
    profileUser: IUser;
    clickDownload: (avatar: IAvatar) => void;
}

const UserAvatars = observer(({ profileUser, clickDownload }: IPropsUserAvatars) => {
    const { user, avatars } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [modalAccept, setModalAccept] = useState({
        active: false,
        avatar: {},
    });

    useEffect(() => {
        getUserAvatars(profileUser.id)
            .then((data) => {
                avatars.setUserAvatars(data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [user, avatars]);

    const clickDel = (avatar: IAvatar) => {
        setModalAccept({
            active: true,
            avatar: { ...avatar },
        });
    };

    return (
        <>
            {!loading && avatars.getUserAvatars()[0] ? (
                <div className='avatarsBlockProfile'>
                    {avatars.getUserAvatars().map((avatar) => (
                        <Avatar
                            profile={user.id === profileUser.id}
                            clickDel={clickDel}
                            clickDownload={clickDownload}
                            avatar={avatar}
                            key={avatar.id}
                        />
                    ))}
                    <ModalAccept
                        modalAccept={modalAccept}
                        setModalAccept={setModalAccept}
                    />
                </div>
            ) : (
                <>
                    {!loading && (
                        <h2 className='noAvatars'>
                            Нет опубликованных аватарок
                        </h2>
                    )}
                </>
            )}
        </>
    );
});

export default UserAvatars;
