const Search = ({textInput, setText}) => {
    return (
        <form className="d-flex col-4" role="search">
            <input 
                value={textInput}
                onChange={event => setText(event.target.value)}
                className="form-control me-2" 
                type="search" 
                placeholder="поиск" 
                aria-label="Search"
                id="mySearch" 
            />
            {/* <button className="btn btn-outline-success" type="submit">Найти</button> */}
        </form>
    )
}

export default Search;