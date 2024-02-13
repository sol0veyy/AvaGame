import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import Avatar from '../Avatar/Avatar';
import styles from './userAvatars.module.css';
import ModalAccept from '../../Modal/ModalAccept';
import { observer } from 'mobx-react-lite';
import { IAvatar } from '../../../store/AvatarStore';
import { getUserAvatars } from '../../../http/avatarsAPI';

interface IPropsUserAvatars {
    clickDownload: (avatar: IAvatar) => void;
}

const UserAvatars = observer(({ clickDownload }: IPropsUserAvatars) => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)
    const [userAvatars, setUserAvatars] = useState<IAvatar[]>([])
    const [modalAccept, setModalAccept] = useState({
        active: false,
        avatar: {},
    });

    useEffect(() => {
        getUserAvatars(user.id)
            .then((data) => {
                setUserAvatars(data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }, [user])

    const clickDel = (avatar: IAvatar) => {
        setModalAccept({
            active: true,
            avatar: { ...avatar },
        });
    };

    if (loading) {
        return (
            <div>Загрузка...</div>
        );
    }

    return (
        <>
            {userAvatars[0] ? (
                <div className={styles.avatarsBlockProfile}>
                    {userAvatars.map((avatar) => (
                        <Avatar
                            profile={true}
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
                <h2 className={styles.noAvatars}>
                    Нет опубликованных аватарок
                </h2>
            )}
        </>
    );
});

export default UserAvatars;
