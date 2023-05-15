import { $authHost, $host } from "."
import { update } from "./userAPI";

export const createAvatar = async (avatar, user) => {
    const {data} = await $authHost.post('api/avatar', avatar);
    await update(user.id);
    return data;
}

export const deleteAvatar = async (avatarId, userId) => {
    const {data} = await $authHost.post('api/avatar/del', {avatarId, userId});
    await update(userId);
    return data;
}

export const setLikes = async (avatarId, userId) => {
    const {data} = await $authHost.post('api/avatar/like', {avatarId, userId});
    return data;
}

export const delLike = async (avatarId, userId) => {
    const {data} = await $authHost.post('api/avatar/like/del', {avatarId, userId});
    return data;
}

export const getLike = async (avatarId, userId) => {
    const {data} = await $host.get('api/avatar/like/' + avatarId + "/" + userId);
    return data;
}

export const getByTag = async (tag) => {
    const {data} = await $host.get('api/avatar/tag/' + tag);
    return data;
}

export const getByFilter = async (time, tags, author, category) => {
    if (time === "") {
        time = "all";
    }
    if (tags === "") {
        tags = "all";
    }
    if (author === "") {
        author = "all";
    }
    if (category === "") {
        category = "all";
    }
    const {data} = await $host.get('api/avatar/filter/' + time + "/" + tags + "/" + author + "/" + category);
    return data;
}

export const getAll = async () => {
    const {data} = await $host.get('api/avatar/');
    return data;
}

export const getUserAvatars = async (userId) => {
    const {data} = await $host.get('api/avatar/' + userId);
    return data;
}