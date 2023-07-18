import React, { useContext, useEffect } from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './avatars.module.css';
import { delLike, getAll, getByTag, setLikes } from '../../http/avatarsAPI';
import { Context } from '../..';
import download from 'downloadjs';
import UserAvatars from '../UserAvatars/UserAvatars';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const Avatars = observer(({ textInput, profile }) => {
    const { user, avatars } = useContext(Context);

    useEffect(() => {
        if (textInput && textInput !== '' && textInput.trim() !== '') {
            getByTag(textInput.trim()).then((data) => avatars.setAvatars(data));
        } else {
            getAll().then((data) => avatars.setAvatars(data));
        }
    }, [textInput, avatars]);

    const clickHeart = async (avatar) => {
        // Проверка авторизации пользователя
        if (!user.isAuth) {
            console.log('unauthorized')
            return
        }

        const onLike = avatar['likes'].filter(
            (like) => like.userId === user.user['id']
        );
        const newArrAvatars = toJS(avatars.avatars).filter((ava) => ava.id !== avatar.id);
        const newObjAvatar = {
            ...avatar,
            likes: [
                ...avatar.likes.filter(
                    (like) => like.userId !== user.user['id']
                ),
            ],
        };

        if (onLike.length) {
            avatars.setAvatars([...newArrAvatars, newObjAvatar]);
            await delLike(avatar.id, user.user['id']);
        } else {
            avatars.setAvatars([
                ...newArrAvatars,
                {
                    ...newObjAvatar,
                    likes: [
                        ...newObjAvatar.likes,
                        { avatarId: avatar.id, userId: user.user['id'] },
                    ],
                },
            ]);
            await setLikes(avatar.id, user.user['id']);
        }
    };

    const clickDownload = async (avatar) => {
        download(process.env.REACT_APP_API_URL + '/' + avatar.img);
    };

    return (
        <>
            {!profile ? (
                <div className={styles.avatarsBlock}>
                    {toJS(avatars.avatars)
                        .sort((a, b) => b.id - a.id)
                        .map((avatar) => (
                            <Avatar
                                clickHeart={clickHeart}
                                clickDownload={clickDownload}
                                avatar={avatar}
                                key={avatar.id}
                            />
                        ))}
                </div>
            ) : (
                <UserAvatars
                    clickHeart={clickHeart}
                    clickDownload={clickDownload}
                />
            )}
        </>
    );
});

export default Avatars;
