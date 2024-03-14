import { $host } from ".";

export const follow = async (followerId: number, userId: number) => {
    try {
        const {data} = await $host.post('api/follower/follow', {followerId, userId});

        return data.follower;
    } catch (err) {
        console.error(err.response.data);
    }
};

export const unfollow = async(followerId: number, userId: number) => {
    try {
        const {data} = await $host.delete(`api/follower/unfollow/${followerId}/${userId}`);

        return data.follower;
    } catch (err) {
        console.error(err);
    }
};

export const getIsUserFollow = async(followerId: number, userId: number) => {
    try {
        const {data} = await $host.get(`api/follower/isUserFollow/${followerId}/${userId}`);

        return data.isFollow;
    } catch (err) {
        console.error(err);
    }
};

export const getAllUserSubs = async(followerId: number) => {
    try {
        const {data} = await $host.get(`api/follower/userSubs/${followerId}`);

        return data.users;
    } catch (err) {
        console.error(err);
    }
};