import React, { useContext } from "react";
import Avatars from "../Avatars/Avatars";
import SubBlock from "../SubBlock/SubBlock";
import { Context } from "../..";
import './mainContent.scss';
import Search from "../Search/Search";

interface IMainContent {
    textInput: string;
    setText: React.Dispatch<React.SetStateAction<string>>
}

const MainContent = ({textInput, setText}: IMainContent) => {
    const {user} = useContext(Context);

    return (
        <main>
            {user.isAuth ? <SubBlock /> : ''}
            <div className="main__block">
                <Search textInput={textInput} setText={setText} />
                <Avatars textInput={textInput} />
            </div>
        </main>
    );
};

export default MainContent;