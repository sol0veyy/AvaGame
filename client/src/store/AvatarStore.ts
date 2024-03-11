import { makeAutoObservable } from "mobx"

interface IAvatarsStore {
    setAvatars: (avatars: IAvatar[]) => void;
    getAll: () => IAvatar[];
    setUserAvatars: (avatars: IAvatar[]) => void;
    getUserAvatars: () => IAvatar[];
}

interface IAvatar {
    id: number;
    img: string;
    likes: ILike[];
    tags: ITag[];
    userId: number;
    updatedAt: string;
    createdAt: string;
    date: string;
}


interface ILike {
    id: number;
    avatarId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

interface ITag {
    id: number;
    avatarId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

class AvatarsStore {
    private avatars: IAvatar[];
    private userAvatars: IAvatar[]
    constructor() {
        this.avatars = null;
        makeAutoObservable(this)
    }

    setAvatars(avatars: IAvatar[]) {
        this.avatars = avatars;
    }

    getAll() {
        return this.avatars;
    }

    setUserAvatars(avatars: IAvatar[]) {
        this.userAvatars = avatars;
    }

    getUserAvatars() {
        return this.userAvatars;
    }
}

export {
    IAvatarsStore,
    IAvatar,
    AvatarsStore,
    ILike
}