import { threadId } from "worker_threads"
import db from "../db"

export const getLikes = async () => {
    return await db.like.findMany({
        where: {
            threadId
        },
        include: {
            user: {
                select: {
                    username: true,
                    full_name: true,
                    id: true
                },
                include: {
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    })
}

export const getCurrentLike = async (threadId: number, userId: number) => {
    return await db.like.findFirst({
        where: {
            threadId,
            userId
        }
    })
}

export const creatLike = async (payload: { threadId: number, userId: number }) => {
    const existedThread = await db.thread.findFirst({
        where: {
            id: payload.threadId
        }
    })

    console.log("payload threads", payload.threadId)
    if (!existedThread) {
        throw new Error("Thread not found")
    }

    const existedLike = await db.like.findFirst({
        where: {
            threadId: payload.threadId,
            userId: payload.userId
        }
    })
    console.log(payload.userId)

    if (existedLike) {
        return await db.like.deleteMany({
            where: {
                threadId: payload.threadId,
                userId: payload.userId
            }
        })
    }

    return await db.like.create({
        data: {
            ...payload
        }
    })
}