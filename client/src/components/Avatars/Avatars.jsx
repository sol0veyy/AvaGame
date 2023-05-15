import React, { useContext, useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import "./avatars.css"
import { delLike, getAll, getByFilter, getByTag, getLike, setLikes } from "../../http/avatarsAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import jwtDecode from "jwt-decode";
import { toJS } from "mobx";
import download from "downloadjs"

const Avatars = observer(({ textInput, isFilter, filterUpdate, time, tags, author, category }) => {
    const { avatar } = useContext(Context)
    const userInfo = jwtDecode(localStorage.getItem("token"));
    const [allAvatars, setAllAvatars] = useState([]);

    useEffect(() => {
        if (textInput !== '' && textInput.trim() !== '') {
            getByTag(textInput.trim()).then(data => setAllAvatars(data));
        } else if (!isFilter) {
            getAll().then(data => setAllAvatars(data));
        } else {
            setAllAvatars(toJS(avatar.avatars));
        }
    }, [textInput, isFilter, avatar, filterUpdate])

    const clickHeart = async (avatar) => {
        let onLike;
        await getLike(avatar.id, userInfo.id).then(data => {
            if (data.length !== 0) {
                onLike = true;
            } else {
                onLike = false;
            }
        });

        if (!onLike) {
            await setLikes(avatar.id, userInfo.id);
        } else {
            await delLike(avatar.id, userInfo.id);
        }
        if (textInput !== '' && textInput.trim() !== '') {
            await getByTag(textInput.trim()).then(data => setAllAvatars(data));
        } else if (!isFilter) {
            await getAll().then(data => setAllAvatars(data));
        } else {
            await getByFilter(time, tags, author, category).then(data => setAllAvatars(data));
        }
    }

    const clickDownload = async (avatar) => {
        download(process.env.REACT_APP_API_URL + "/" + avatar.img);
    }

    return (
        <div className="avatarsBlock">
            {allAvatars.map(avatar =>
                <Avatar
                    clickHeart={clickHeart}
                    clickDownload={clickDownload}
                    avatar={avatar}
                    key={avatar.id}
                />
            )}
        </div>
    )
});

export default Avatars;