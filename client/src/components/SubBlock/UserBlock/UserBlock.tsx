import { IUser } from "../../../store/UserStore";
import { getNoun } from "../../Button/ProfileButton";

interface IUserBlock {
    user: IUser;
}

const UserBlock = ({user}: IUserBlock) => {
    return (
        <div className="user__block d-flex mb-3">
            <img className="user__avatar" src={process.env.REACT_APP_API_URL + user.img} alt="avatar" width={50} height={50} />
            <div className="d-flex justify-content-between w-100">
                <div className="d-flex flex-column justify-content-around mx-2">
                    <span className="user__login">{user.login}</span>
                    <span className="user__colAvatars text-secondary">{user.publications + " " + getNoun(user.publications, "аватарка", "аватарки", "аватарок")}</span>
                </div>
                <img className="btn__deleteUser align-self-center" src="/img/sub-user.svg" alt="delete user" width={26} height={26} />
            </div>
        </div>
    )
}

export default UserBlock;