import { Request, Response } from "express";
import * as profileServices from "../services/ProfileServices"

export const updateProfile = (req: Request, res: Response) => {
    try {
        const userId = res.locals.loginSession.id
        const { body } = req
        const files = req.files as { [fieldname: string]: Express.Multer.File[] }
        const cover = files.cover[0].filename
        const avatar = files.avatar[0].filename

        if (cover) {
            body.cover = cover
        }

        if (avatar) {
            body.avatar = avatar
        }

        profileServices.updateProfile(userId, body)

        return res.json({
            status: true,
            message: "success",
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

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.loginSession.id
        const profile = await profileServices.getProfile(userId)

        res.json({
            status: true,
            message: "success",
            data: profile
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log("🚀 ~ getProfile ~ err:", err)

        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const profile = await profileServices.getProfile(+id)

        res.json({
            status: true,
            message: "success",
            data: profile
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log("🚀 ~ getProfileById ~ err:", err)

        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}