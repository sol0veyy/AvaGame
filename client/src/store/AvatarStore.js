import { makeAutoObservable } from "mobx"

export default class Avatars {
    constructor() {
        this._avatars = [];
        makeAutoObservable(this)
    }

    setAvatars(avatars) {
        this._avatars = avatars;
    }

    get avatars() {
        return this._avatars;
    }
}