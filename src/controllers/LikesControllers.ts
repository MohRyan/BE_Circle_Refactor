import { Request, Response } from "express"
import * as likeServices from "../services/LikesServices"

export const getLikes = async (req: Request, res: Response) => {
    try {
        const likes = await likeServices.getLikes()
        res.status(500).json({
            status: true,
            message: "Get Success",
            data: likes
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log(err)

        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
}

export const getCurrentLike = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.params
        const userId = res.locals.loginSession.id
        const likes = await likeServices.getCurrentLike(+threadId, +userId)

        res.json({
            status: true,
            message: "getCurrentLike Success",
            data: { likes }
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log(err)

        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const creatLike = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.body
        // console.log(threadId)
        const userId = res.locals.loginSession.id
        await likeServices.creatLike({
            userId,
            threadId
        })

        res.json({
            status: true,
            message: "Like success"
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log(err)
        res.status(500).json({
            status: false,
            message: err.message,
            salah: "salah"
        })
    }
}