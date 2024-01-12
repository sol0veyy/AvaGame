import React, { useContext, useState } from 'react';
import { Context } from '../..';
import Avatar from '../Avatar/Avatar';
import styles from './userAvatars.module.css';
import ModalAccept from '../Modal/ModalAccept';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { IAvatar } from '../../store/AvatarStore';

interface IPropsUserAvatars {
    clickHeart: (avatar: IAvatar) => void;
    clickDownload: (avatar: IAvatar) => void;
}

const UserAvatars = observer(({ clickHeart, clickDownload }: IPropsUserAvatars) => {
    const { user, avatars } = useContext(Context);
    const [modalAccept, setModalAccept] = useState({
        active: false,
        avatar: {},
    });
    const userAvatars = toJS(avatars.avatars)
        .filter((avatar) => avatar.userId === user.user['id'])
        .sort((a, b) => b.id - a.id);

    const clickDel = (avatar: IAvatar) => {
        setModalAccept({
            active: true,
            avatar: { ...avatar },
        });
    };

    return (
        <>
            {userAvatars[0] ? (
                <div className={styles.avatarsBlockProfile}>
                    {userAvatars.map((avatar) => (
                        <Avatar
                            profile={true}
                            clickDel={clickDel}
                            clickHeart={clickHeart}
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
                <h2 className={styles.noAvatars}>
                    Нет опубликованных аватарок
                </h2>
            )}
        </>
    );
});

export default UserAvatars;
