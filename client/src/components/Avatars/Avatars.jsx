import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import "./avatars.css"

const Avatars = () => {
    const [avatars, setAvatars] = useState([
        {
            id: 0,
            like: false
        },
        {
            id: 1,
            like: false
        },        {
            id: 2,
            like: false
        },        {
            id: 3,
            like: false
        },        {
            id: 4,
            like: false
        },        {
            id: 5,
            like: false
        },        {
            id: 6,
            like: false
        },        {
            id: 7,
            like: false
        },        {
            id: 8,
            like: false
        },        {
            id: 9,
            like: false
        },
    ])

    const clickHeart = (avatar) => {
        setAvatars(prevState =>
            prevState.map(item =>
                item.id === avatar.id
                ? avatar.like ? {...item, like: false} : {...item, like: true}
                : item
            )
        )
    }

    return (
        <div className="avatarsBlock">
            {avatars.map(avatar => 
                <Avatar avatar={avatar} clickHeart={clickHeart} key={avatar.id} />
            )}
        </div>
    )
}

export default Avatars;