import { useEffect, useState } from "react";
import "./SubBlock.scss";
import { getAllUsers } from "../../http/userAPI";
import { IUser } from "../../store/UserStore";
import UserBlock from "./UserBlock/UserBlock";

const SubBlock = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data.users);
        });
    }, [])

    return (
        <div className="sub__block d-flex flex-column gap-3 bg-body-tertiary">
            <div className="d-flex gap-3">
                <button>Мои подписки</button>
                <button className="btn__active">Все пользователи</button>
            </div>
            <form className="d-flex" role="search">
                <input className="form-control" type="search" placeholder="Поиск" aria-label="Search" />
            </form>
            <div>
                {users.map((user) => (
                    <UserBlock key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default SubBlock;