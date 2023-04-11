import React from "react";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Publications from "../components/Publications";
import "../css/profile.css"

const Profile = () => {
    return (
        <div className="profile">
            <ProfileInfo />
            <Publications place="profile" />
        </div>
    )
}

export default Profile;