import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { delLike, getAll, getByTag, setLikes } from '../../http/avatarsAPI';
import { Context } from '../..';
import download from 'downloadjs';
import UserAvatars from '../UserAvatars/UserAvatars';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { IAvatar } from '../../store/AvatarStore';

interface IPropsAvatars {
    textInput: string;
    profile: boolean;
}

const Avatars = observer(({ textInput, profile }: IPropsAvatars) => {
    const { user, avatars } = useContext(Context);
    const [pages, setPages] = useState([]);
    const [selectedPage, setPage] = useState(1);

    useEffect(() => {
        if (textInput && textInput !== '' && textInput.trim() !== '') {
            getByTag(textInput.trim()).then((data) => avatars.setAvatars(data));
        } else {
            getAll(selectedPage).then((data) => {
                avatars.setAvatars(data.avatars);
                const N = Math.round(data.colAvatars / 30) + 1;
                setPages(Array.from({ length: N }, (_, index) => index + 1));
            });
        }
    }, [textInput, avatars, selectedPage]);

    const clickHeart = async (avatar: IAvatar) => {
        // Проверка авторизации пользователя
        if (!user.isAuth) {
            console.log('unauthorized');
            return;
        }

        const onLike = avatar['likes'].filter(
            (like) => like.userId === user.user['id']
        );
        const newArrAvatars = toJS(avatars.avatars).filter(
            (ava) => ava.id !== avatar.id
        );
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
                        { 
                            id: new Date().getSeconds(),
                            avatarId: avatar.id, 
                            userId: user.user['id'],
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        },
                    ],
                },
            ]);
            await setLikes(avatar.id, user.user['id']);
        }
    };

    const clickDownload = async (avatar: IAvatar) => {
        download(process.env.REACT_APP_API_URL + '/' + avatar.img);
    };

    return (
        <>
            {!profile ? (
                <>
                    <div className="d-flex gap-4 px-5 justify-content-center mt-5">
                        {
                        toJS(avatars.avatars ? [...avatars.avatars] : [])
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
                    {/* <Pagination
                        pages={pages}
                        selectedPage={selectedPage}
                        setPage={setPage}
                    /> */}
                </>
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
