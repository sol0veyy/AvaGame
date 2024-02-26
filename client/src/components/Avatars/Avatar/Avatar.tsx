import React, { useContext, useEffect, useState } from "react";
import "./avatar.scss"
import { Context } from "../../..";
import { IAvatar } from "../../../store/AvatarStore";
import { delLike, getLike, setLikes } from "../../../http/avatarsAPI";

interface IPropsAvatar {
    clickDel?: (avatar: IAvatar) => void;
    clickDownload: (avatar: IAvatar) => void;
    avatar: IAvatar;
    profile?: boolean;
}

const Avatar = ({ clickDel, clickDownload, avatar, profile }: IPropsAvatar) => {
    const {user} = useContext(Context);

    const [userAvatar, setUserAvatar] = useState(avatar)
    const [onLike, setOnLike] = useState(false);
    
    useEffect(() => {
        getLike(userAvatar.id, user.id)
            .then(data => {
                if (data) {
                    setOnLike(true)
                }
            })
            .catch(err => console.log(err))
    }, [userAvatar, user])

    const clickHeart = async () => {
        if (!user.isAuth) {
            console.log('unauthorized');
            return;
        }

        let avatar = null;

        if (onLike) {
            avatar = await delLike(userAvatar.id, user.id);
        } else {
            avatar = await setLikes(userAvatar.id, user.id);
        }

        setOnLike(!onLike);
        setUserAvatar(avatar);
    }

    return (
        <div className="avatarBlock d-flex flex-column align-items-center align-self-start position-relative">
            <img className="picture" width={150} src={process.env.REACT_APP_API_URL + avatar.img} alt="avatar" />
            <div className={`likes fs-3 ${onLike ? "red" : ""}`}>{userAvatar.likes.length}</div>
            <div>
                <svg onClick={clickHeart} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={`${onLike ? 'red' : 'currentColor'}`} className="heart bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            </div>
            {profile ? 
                <svg onClick={() => clickDel(avatar)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="delButton bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                :
                ""
            }
            <svg onClick={() => clickDownload(avatar)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="download bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
            </svg>
        </div>
    )
}

export default Avatar;