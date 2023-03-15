import React from "react";
import "./avatar.scss"
import ava from "../../img/ava.jpg"

const Avatar = ({clickHeart, avatar}) => {
    return (
        <div className="avatarBlock">
            <img src={ava} alt="avatar" />
            <div className="heartBlock">
                <div onClick={() => clickHeart(avatar)} className={`heart ${avatar.like ? 'heartRed' : ''}`}></div>
            </div>
        </div>
    )
}

export default Avatar;