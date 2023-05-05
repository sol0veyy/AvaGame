import React, { useState } from "react";
import ProfileInfo from "../components/Profile/ProfileInfo";
import UserAvatars from "../components/UserAvatars/UserAvatars";
import "../css/profile.css"
import ModalUploadAvatar from "../components/Modal/ModalUploadAvatar";
import ChangeSettings from "../components/Modal/ChangeSettings";
import jwtDecode from "jwt-decode";

const Profile = () => {
    const infoUser = jwtDecode(localStorage.getItem("token"));

    const [uploadActive, setUploadActive] = useState(false);
    const [settingsActive, setSettingsActive] = useState(false);

    return (
        <div className="profile">
            <ProfileInfo setUploadActive={setUploadActive} setSettingsActive={setSettingsActive} />
            <UserAvatars />
            <ChangeSettings infoUser={infoUser} modalActive={settingsActive} setModalActive={setSettingsActive} />
            <ModalUploadAvatar modalActive={uploadActive} setModalActive={setUploadActive} />
        </div>
    )
}

export default Profile;