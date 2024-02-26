import React, { useState } from "react";
import ProfileInfo from "../components/Profile/ProfileInfo";
import "../css/profile.scss"
import ModalUploadAvatar from "../components/Modal/ModalUploadAvatar";
import ChangeSettings from "../components/Modal/ChangeSettings";
import jwtDecode from "jwt-decode";
import UserAvatars from "../components/Avatars/UserAvatars/UserAvatars";
import { clickDownload } from "../components/Avatars/functions";

const Profile = () => {
    const infoUser = jwtDecode(localStorage.getItem("token"));

    const [uploadActive, setUploadActive] = useState(false);
    const [settingsActive, setSettingsActive] = useState(false);

    return (
        <div className="profile">
            <ProfileInfo setUploadActive={setUploadActive} setSettingsActive={setSettingsActive} />
            <UserAvatars clickDownload={clickDownload} />
            <ModalUploadAvatar modalActive={uploadActive} setModalActive={setUploadActive} />
            <ChangeSettings infoUser={infoUser} modalActive={settingsActive} setModalActive={setSettingsActive} />
        </div>
    )
}

export default Profile;