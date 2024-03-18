import React, { useContext } from "react";
import Avatars from "../Avatars/Avatars";
import SubBlock from "../SubBlock/SubBlock";
import { Context } from "../..";

interface IMainContent {
    textInput: string;
}

const MainContent = ({textInput}: IMainContent) => {
    const {user} = useContext(Context);

    return (
        <div className="d-flex p-5">
            {user.isAuth ? <SubBlock /> : ''}
            <Avatars textInput={textInput} />
        </div>
    );
};

export default MainContent;