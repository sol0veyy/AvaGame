import React, { useContext, useState } from "react";
import Filter from "./Filter/Filter";
import { getByFilter } from "../http/avatarsAPI";
import { Context } from "..";
import Avatars from "./Avatars/Avatars";

const MainContent = ({textInput}) => {
    const {avatar} = useContext(Context)
    const [time, setTime] = useState("");
    const [tags, setTags] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState(2);
    const [isFilter, setIsFilter] = useState(false);
    const [filterUpdate, setFilterUpdate] = useState(false);

    const filterAvatar = async () => {
        const tag = tags.replace(/#/, ''); 
        await getByFilter(time, tag, author, category).then(data => avatar.setAvatars(data));
        if (filterUpdate) {
            setFilterUpdate(false);
        } else {
            setFilterUpdate(true);
        }
        if (time && tags && author) {
            setIsFilter(false);
        } else {
            setIsFilter(true);
        }
    }

    return (
        <div className="main-content">
            <div className="publications">
                <Avatars 
                    textInput={textInput} 
                    isFilter={isFilter}
                    filterUpdate={filterUpdate}
                    time={time}
                    tags={tags}
                    author={author}
                    category={category}
                />
            </div>
            <Filter 
                setTime={setTime} 
                setTags={setTags}
                setAuthor={setAuthor}
                setCategory={setCategory}
                filterAvatar={filterAvatar}
            />
        </div>
    )
}

export default MainContent;