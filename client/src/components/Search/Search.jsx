import "./search.css"

const Search = ({textInput, setText}) => {

    function clearSearch() {
        setText('')
    }

    return (
        <div className="search">
            <div id="icon"></div>
            <div className="input">
                <input
                    value={textInput}
                    onChange={event => setText(event.target.value)}
                    type="text"
                    placeholder="Поиск" 
                    id="mySearch"
                />
            </div>
            <span className="clear" onClick={clearSearch}></span>
        </div>
    )
}

export default Search;