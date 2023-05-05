import { makeAutoObservable } from "mobx"

export default class Avatars {
    constructor() {
        this._avatars = [];
        this._userAvatars = [];
        makeAutoObservable(this)
    }

    setUserAvatars(avatars) {
        this._userAvatars = avatars;
    }

    setAvatars(avatars) {
        this._avatars = avatars;
    }

    get userAvatars() {
        return this._userAvatars;
    }

    get avatars() {
        return this._avatars;
    }
}