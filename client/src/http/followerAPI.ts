import { $host } from "."

export const follow = async (followerId: number, userId: number) => {
    const data = $host.post('api/follower/follow', {followerId, userId})

    return data;
}