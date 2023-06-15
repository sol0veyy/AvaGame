import React, { useContext, useEffect, useState } from 'react';
import { delLike, getLike, getUserAvatars, setLikes } from '../../http/avatarsAPI';
import { Context } from '../..';
import Avatar from '../Avatar/Avatar';
import jwtDecode from 'jwt-decode';
import { observer } from 'mobx-react-lite';
import "./userAvatars.css";
import ModalAccept from '../Modal/ModalAccept';
import download from 'downloadjs';

const UserAvatars = observer(({update, setUpdate}) => {
    const {avatar} = useContext(Context)
    const infoUser = jwtDecode(localStorage.getItem("token"));
    const [allAvatars, setAllAvatars] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [oneAvatar, setOneAvatar] = useState([]);

    const userId = infoUser.id;

    useEffect(() => {
        getUserAvatars(userId).then(data => {
            setAllAvatars(data);
            localStorage.setItem("colAvatars", data.length);
        });
    }, [avatar.userAvatars, userId])

    const clickHeart = async (avatar) => {
        let onLike;
        await getLike(avatar.id, infoUser.id).then(data => {
            if (data.length !== 0) {
                onLike = true;
            } else {
                onLike = false;
            }
        });
        if (!onLike) {
            await setLikes(avatar.id, infoUser.id);
        } else {
            await delLike(avatar.id, infoUser.id);
        }
        getUserAvatars(userId).then(data => setAllAvatars(data));
    }

    const clickDel = (avatar) => {
        setModalActive(true);
        setOneAvatar(avatar);
    }

    const clickDownload = async (avatar) => {
        download(process.env.REACT_APP_API_URL + "/" + avatar.img);
    }
    
    avatar.setAvatars(allAvatars);

    return (
        <div className="avatarsBlockProfile">
            {allAvatars[0] ? allAvatars.map(avatar => 
                <Avatar
                    profile={true}
                    clickDel={clickDel}
                    clickHeart={clickHeart}
                    clickDownload={clickDownload}
                    avatar={avatar}
                    key={avatar.id}
                />
            )
            :
            <h2 style={{color: '#777777', width: '450px', marginTop: '75px'}}>Нет опубликованных аватарок</h2>
            }
            <ModalAccept update={update} setUpdate={setUpdate} oneAvatar={oneAvatar} userId={userId} modalActive={modalActive} setModalActive={setModalActive} />
        </div>
    );
});

export default UserAvatars;