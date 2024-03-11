import { useContext } from "react";
import { Context } from "../../..";
import { follow } from "../../../http/followerAPI";
import { IUser } from "../../../store/UserStore";
import { getNoun } from "../../Button/ProfileButton";

interface IUserBlock {
    otherUser: IUser;
}

const UserBlock = ({ otherUser }: IUserBlock) => {
    const { user } = useContext(Context)

    const followToUser = () => {
        follow(otherUser.id, user.id).then((data) => {
            console.log(data);
        })
    }

    return (
        <div className="user__block d-flex mb-3">
            <img className="user__avatar" src={process.env.REACT_APP_API_URL + otherUser.img} alt="avatar" width={50} height={50} />
            <div className="d-flex justify-content-between w-100">
                <div className="d-flex flex-column justify-content-around mx-2">
                    <span className="user__login">{otherUser.login}</span>
                    <span className="user__colAvatars text-secondary">{otherUser.publications + " " + getNoun(otherUser.publications, "аватарка", "аватарки", "аватарок")}</span>
                </div>
                <img className="btn__deleteUser align-self-center" src="/img/sub-user.svg" alt="delete user" width={26} height={26} />
            </div>
        </div>
    )
}

export default UserBlock;