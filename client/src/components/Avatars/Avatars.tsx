import React, { useEffect, useState } from 'react';
import Avatar from './Avatar/Avatar';
import { getAll, getByTag } from '../../http/avatarsAPI';
import { observer } from 'mobx-react-lite';
import { IAvatar } from '../../store/AvatarStore';
import { clickDownload } from './functions';
import Pagination from '../Pagination/Pagination';
import './avatars.scss';

interface IPropsAvatars {
    textInput?: string;
}

const Avatars = observer(({ textInput }: IPropsAvatars) => {
    const [avatars, setAvatars] = useState<IAvatar[]>([]);
    const [pages, setPages] = useState([]);
    const [selectedPage, setPage] = useState(1);

    useEffect(() => {
        if (textInput && textInput !== '' && textInput.trim() !== '') {
            getByTag(textInput.trim()).then((data) => setAvatars(data));
        } else {
            getAll(selectedPage).then((data) => {
                setAvatars(data.avatars);
                const N = Math.round(data.colAvatars / 30) + 1;
                setPages(Array.from({ length: N }, (_, index) => index + 1));
            });
        }
    }, [textInput, selectedPage]);

    return (
        <>
            <div className="avatars__block">
                {
                    (avatars ? [...avatars] : [])
                        .sort((a, b) => b.id - a.id)
                        .map((avatar) => (
                            <Avatar
                                clickDownload={clickDownload}
                                avatar={avatar}
                                key={avatar.id}
                            />
                        ))}
            </div>
            {pages.length > 1 ? 
                <Pagination
                    pages={pages}
                    selectedPage={selectedPage}
                    setPage={setPage}
                />
                :
                ''
            }
        </>
    );
});

export default Avatars;
