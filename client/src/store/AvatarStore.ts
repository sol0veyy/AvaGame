import { makeAutoObservable } from "mobx"

interface IAvatarsStore {
    avatars: IAvatar[];
    setAvatars: (avatars: IAvatar[]) => void;
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
    avatars: IAvatar[];
    constructor() {
        this.avatars = null;
        makeAutoObservable(this)
    }

    setAvatars(avatars: IAvatar[]) {
        this.avatars = avatars;
    }
}

export {
    IAvatarsStore,
    IAvatar,
    AvatarsStore
}