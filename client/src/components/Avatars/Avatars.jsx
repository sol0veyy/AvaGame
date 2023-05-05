import React, { useContext, useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import "./avatars.css"
import { getAll } from "../../http/avatarsAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { toJS } from "mobx";

const Avatars = observer(() => {
    const {avatar} = useContext(Context)
    
    useEffect(() => {
        getAll().then(data => avatar.setAvatars(data));
    }, [avatar])
    
    const allAvatars = toJS(avatar.avatars);

    return (
        <div className="avatarsBlock">
            {allAvatars.map(avatar => 
                <Avatar 
                    avatar={avatar}
                    key={avatar.id}
                />
            )}
        </div>
    )
});

export default Avatars;