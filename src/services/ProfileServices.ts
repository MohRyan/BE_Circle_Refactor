import db from "../db"
import { Iprofile } from "../interfaces"

export const updateProfile = async (userId: number, payload: Iprofile) => {

    const profile = await db.profile.update({
        where: {
            userId
        },
        data: {
            ...payload
        }
    })
    return profile
}

export const getProfile = async (userId: number) => {
    return await db.profile.findFirst({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    full_name: true,
                    username: true,
                    email: true,
                    _count: true
                }
            }

        }
    })
}
