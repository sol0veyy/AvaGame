import { $authHost, $host } from "."

export const createAvatar = async (avatar) => {
    const {data} = await $authHost.post('api/avatar', avatar)
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