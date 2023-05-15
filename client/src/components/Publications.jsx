import React from "react";
import Avatars from "./Avatars/Avatars";
import "../css/style.css"

const Publications = ({textInput, isFilter, filterUpdate, time, tags, author, category}) => {
    return (
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
    )
}

export default Publications;