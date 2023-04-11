import React from "react";
import "./avatar.scss"
import ava from "../../img/ava.jpg"
import download from "../../img/download.svg"

const Avatar = ({ clickHeart, avatar }) => {
    return (
        <div className="avatarBlock">
            <img className="picture" src={ava} alt="avatar" />
            <div className="heartBlock">
                <div onClick={() => clickHeart(avatar)} className={`heart ${avatar.like ? 'heartRed' : ''}`}>
                </div>
            </div>
            <div className="download"><img src={download} alt="download" /></div>
        </div>
    )
}

export default Avatar;