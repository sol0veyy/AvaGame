import React, { useContext } from "react";
import Avatars from "../Avatars/Avatars";
import SubBlock from "../SubBlock/SubBlock";
import { Context } from "../..";
import './mainContent.scss';

interface IMainContent {
    textInput: string;
}

const MainContent = ({textInput}: IMainContent) => {
    const {user} = useContext(Context);

    return (
        <main>
            {user.isAuth ? <SubBlock /> : ''}
            <Avatars textInput={textInput} />
        </main>
    );
};

export default MainContent;