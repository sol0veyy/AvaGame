import Avatars from "../Avatars/Avatars";
import SubBlock from "../SubBlock/SubBlock";

const MainContent = ({textInput}) => {
    return (
        <div className="d-flex p-5">
            <SubBlock />
            <Avatars textInput={textInput} />
        </div>
    );
};

export default MainContent;