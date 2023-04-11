import React from "react";
import Avatars from "./Avatars/Avatars";
import "../css/style.css"

const Publications = ({place}) => {
    return (
        <div className="publications">
            <Avatars place={place} />
        </div>
    )
}

export default Publications;