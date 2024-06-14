import { Request, Response } from "express"
import db from '../db'
import * as followServices from "../services/FollowsServices"

export const follow = async (req: Request, res: Response) => {
    try {
        const { followersId } = req.body
        const followingId = res.locals.loginSession.id

        const follow = await followServices.follow(followersId, followingId)

        res.json({
            success: true,
            message: follow
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

export const getFollowing = async (req: Request, res: Response) => {
    try {
        const followingId = res.locals.loginSession.id

        const following = await db.follow.findMany({
            where: {
                followingId: +followingId
            },
            select: {
                follower: {
                    select: {
                        id: true,
                        full_name: true,
                        username: true,
                        profile: {
                            select: {
                                avatar: true
                            }
                        }
                    }
                }
            }
        })

        res.json({
            succes: true,
            message: "succes",
            data: following
        })
    } catch (error) {
        const err = error as Error
        console.log(err)
        res.status(500).json({
            succes: false,
            error: error
        })
    }
}

export const getFollowers = async (req: Request, res: Response) => {
    try {
        const followingId = res.locals.loginSession.id

        const followers = await db.follow.findMany({
            where: {
                followerId: +followingId
            },
            include: {
                following: {
                    select: {
                        id: true,
                        full_name: true,
                        username: true,
                        profile: {
                            select: {
                                avatar: true
                            }
                        }
                    }
                }
            }
        })

        res.json({
            succes: true,
            message: "succes",
            data: followers
        })

    } catch (error) {
        const err = error as Error
        console.log(err)

        res.status(500).json({
            succes: false,
            error: err.message
        })
    }
}

export const checkFollowStatus = async (req: Request, res: Response) => {
    try {
        const loggedInId = res.locals.loginSession.id
        const { userId } = req.params

        const isFollowings = await db.follow.findFirst({
            where: {
                followerId: loggedInId,
                followingId: +userId
            }
        })

        res.json({
            succes: true,
            message: "succes",
            data: isFollowings ? true : false
        })
    } catch (error) {
        const err = error as Error
        console.log(err)

        res.status(500).json({
            succes: false,
            error: err.message
        })
    }
}

export const getSuggest = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.loginSession.id

        const suggestedUsers = await followServices.getSuggest(userId)

        res.json({
            succes: true,
            message: "succes",
            data: suggestedUsers
        })
    } catch (error) {
        const err = error as Error
        console.log(err)

        res.status(500).json({
            succes: false,
            error: err.message
        })
    }
}

