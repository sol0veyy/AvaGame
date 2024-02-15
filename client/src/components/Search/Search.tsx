const Search = ({textInput, setText, className}) => {
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
    )
}

export default Search;