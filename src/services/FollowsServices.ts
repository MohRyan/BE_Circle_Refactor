import db from "../db"

export const follow = async (followerId: number, followingId: number) => {
    const existedFollow = await db.follow.findFirst({
        where: {
            followingId,
            followerId
        }
    })

    if (existedFollow) {
        await db.follow.deleteMany({
            where: {
                followerId,
                followingId
            }
        })
        return "unfollowing successful"
    }

    const follow = await db.follow.create({
        data: {
            followingId,
            followerId
        }
    })

    return "following successful"
}

export const getSuggest = async (userId: number) => {
    try {
        const users = await db.user.findMany({
            where: {
                NOT: {
                    id: userId
                }
            },
            select: {
                id: true,
                username: true,
                full_name: true,
                profile: {
                    select: {
                        avatar: true
                    }
                },
            },
        })

        const followedUsersId = (await db.follow.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            }
        })).map((follow) => follow.followingId)

        const suggestedUsers = users.filter((user) => !followedUsersId.includes(user.id))

        const randomSuggest = getRandomUsers(suggestedUsers, 5)

        return randomSuggest
    } catch (error) {
        throw new Error("Failed to fetch sugested users.")
    }
}

const getRandomUsers = (users: any, count: number) => {
    const randomUsers = []
    const totalUsers = users.length
    const indexes = []

    for (let i = 0; i < totalUsers; i++) {
        indexes.push(i);
    }

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * indexes.length)
        const selectedIndex = indexes.splice(randomIndex, 1)[0]
        randomUsers.push(users[selectedIndex])
    }

    return randomUsers
}


