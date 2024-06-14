type FormUsers = {
    username: string;
    full_name: string;
    email: string;
    password: string;
    // profile_picture: string | '';
    // profile_description: string | '';
}

type Iprofile = {
    avatar: string,
    cover: string,
    bio: string,
    // idUsers: number
}
type Ithreads = {
    id?: number;
    content?: string;
    userId: number;
    threadId?: number;
    posted_at?: Date
}

interface FormThreads {
    content: string,
    image: string,
    idUsers: number
}

interface isLikes {
    userLikeId: number,
    threadsLikeId: number,
    // users: number
}

interface isReplies {
    content: string,
    userRepliesId: number,
    threadsRepliesId: number,
    // users: number
}
interface isFollows {
    user_follow: boolean,
    // full_name: string,
    // username: string,
    // userFollowed_Id: number,
    userFollower_Id: number,
    // users: number
}


export { FormUsers, FormThreads, Ithreads, isLikes, isReplies, isFollows, Iprofile }