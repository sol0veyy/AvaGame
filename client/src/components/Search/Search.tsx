import React, { Dispatch, SetStateAction } from "react";

interface ISearch {
    textInput: string;
    setText: Dispatch<SetStateAction<string>>;
    className: string;
}

const Search = ({textInput, setText, className}: ISearch) => {
    return (
        <form className={`${className} d-flex col-4`} role="search">
            <input 
                value={textInput}
                onChange={event => setText(event.target.value)}
                className="form-control me-2" 
                type="search" 
                placeholder="поиск" 
                aria-label="Search"
                id="mySearch" 
            />
        </form>
    );
};

export default Search;