import React, { useState } from "react";
import ProfileInfo from "../components/Profile/ProfileInfo";
import "../css/profile.css"
import ModalUploadAvatar from "../components/Modal/ModalUploadAvatar";
import ChangeSettings from "../components/Modal/ChangeSettings";
import jwtDecode from "jwt-decode";
import Avatars from "../components/Avatars/Avatars";

const Profile = () => {
    const infoUser = jwtDecode(localStorage.getItem("token"));

    const [uploadActive, setUploadActive] = useState(false);
    const [settingsActive, setSettingsActive] = useState(false);

    return (
        <div className="profile">
            <ProfileInfo setUploadActive={setUploadActive} setSettingsActive={setSettingsActive} />
            <Avatars profile={true} />
            <ModalUploadAvatar modalActive={uploadActive} setModalActive={setUploadActive} />
            <ChangeSettings infoUser={infoUser} modalActive={settingsActive} setModalActive={setSettingsActive} />
        </div>
    )
}

export default Profile;