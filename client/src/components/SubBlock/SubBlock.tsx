import "./SubBlock.scss";

const SubBlock = () => {
    return (
        <div className="sub__block d-flex flex-column gap-3 bg-body-tertiary">
            <div className="d-flex gap-3">
                <button>Мои подписки</button>
                <button>Все пользователи</button>
            </div>
            <form className="d-flex" role="search">
                <input className="form-control" type="search" placeholder="Поиск" aria-label="Search" />
            </form>
            <div>
                <div className="user__block d-flex">
                    <img className="user__avatar" src={process.env.REACT_APP_API_URL + "img/nonAvatar.jpg"} alt="avatar" width={50} height={50} />
                    <div className="d-flex justify-content-between w-100">
                        <div className="d-flex flex-column justify-content-around mx-2">
                            <span className="user__login">ScraY</span>
                            <span className="user__colAvatars text-secondary">2 аватарки</span>
                        </div>
                        <img className="btn__deleteUser align-self-center" src="/img/delete-user.svg" alt="delete user" width={30} height={30} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubBlock;