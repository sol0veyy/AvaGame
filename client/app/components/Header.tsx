import ProfileButton from "./Button/ProfileButtons";

const Header = ({textInput, setText}) => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand col-2" href="#">AvaGame</a>
                {/* <Search textInput={textInput} setText={setText} /> */}
                <ProfileButton />
            </div>
        </nav>
    )
}

export default Header;