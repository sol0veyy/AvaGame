/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import { follow, getIsUserFollow, unfollow } from "../../../http/followerAPI";
import { IUser } from "../../../store/UserStore";
import { getNoun } from "../../Button/ProfileButton";

interface IUserBlock {
    otherUser: IUser;
}

const UserBlock = ({ otherUser }: IUserBlock) => {
    const { user } = useContext(Context);
    const isThisUser = user.id === otherUser.id;
    const [isFollow, setIsFollow] = useState(false);

    const follow_unfollow = () => {
        if (isFollow) {
            unfollow(user.id, otherUser.id)
                .then(() => {
                    setIsFollow(false);
                });
        } else {
            follow(user.id, otherUser.id)
                .then(() => {
                    setIsFollow(true);
                });
        }
    };

    useEffect(() => {
        if (isThisUser) return;

        getIsUserFollow(user.id, otherUser.id)
            .then((isFollow: boolean) => {
                setIsFollow(isFollow);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="user__block d-flex mb-3">
            <img className="user__avatar" src={process.env.REACT_APP_API_URL + otherUser.img} alt="avatar" width={50} height={50} />
            <div className="d-flex justify-content-between w-100">
                <div className="d-flex flex-column justify-content-around mx-2">
                    <span className="user__login">{otherUser.login}</span>
                    <span className="user__colAvatars text-secondary">{otherUser.publications + " " + getNoun(otherUser.publications, "аватарка", "аватарки", "аватарок")}</span>
                </div>
                {isThisUser ?
                    <span className="text-success align-self-center">Это вы!</span>                    
                    :
                    <button 
                        className="p-0 align-self-center"
                        onClick={follow_unfollow}
                    >
                        <img src={`/img/${isFollow ? 'delete-user.svg' : 'sub-user.svg'}`} alt="delete user" width={26} height={26} />
                    </button>
                }
            </div>
        </div>
    );
};

export default UserBlock;