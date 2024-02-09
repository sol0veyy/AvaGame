import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { getAll, getByTag } from '../../http/avatarsAPI';
import { Context } from '../..';
import UserAvatars from '../UserAvatars/UserAvatars';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { IAvatar } from '../../store/AvatarStore';
import download from 'downloadjs'

interface IPropsAvatars {
    textInput?: string;
    profile?: boolean;
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
                    clickDownload={clickDownload}
                />
            )}
        </>
    );
});

export default Avatars;
