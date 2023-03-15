import React from "react";
import Filter from "./Filter/Filter";
import Publications from "./Publications";

const MainContent = () => {
    return (
        <div className="main-content">
            <Publications />
            <Filter />
        </div>
    )
}

export default MainContent;