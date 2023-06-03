import React, { useContext } from "react";
import "./avatar.scss"
import download from "../../img/download.svg"
import btnDelete from "../../img/delete.svg"
import { Context } from "../..";

const Avatar = ({ clickDel, clickHeart, clickDownload, avatar, profile }) => {
    const {user} = useContext(Context);
    const likes = avatar.likes.filter(like => like.userId === user.user['id']);
    let onLike;

    if (likes.length !== 0) {
        onLike = true;
    } else {
        onLike = false;
    }

    return (
        <div className="avatarBlock">
            <img className="picture" src={process.env.REACT_APP_API_URL + avatar.img} alt="avatar" />
            <div className={`likes ${onLike ? "onLike" : ""}`}>{avatar.likes.length}</div>
            <div className="heartBlock">
                <div onClick={() => clickHeart(avatar)} className={`heart ${onLike ? 'heartRed' : ''}`}>
                </div>
            </div>
            {profile ? 
                <div onClick={() => clickDel(avatar)} className="delButton">
                    <img src={btnDelete} alt="delete" />
                </div>
                :
                ""
            }
            <div onClick={() => clickDownload(avatar)} className={`download ${profile ? "downloadProfile" : ""}`}><img src={download} alt="download" /></div>
        </div>
    )
}

export default Avatar;