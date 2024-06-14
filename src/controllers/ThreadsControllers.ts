import { Request, Response } from "express";
import * as threadServices from "../services/ThreadsServices"

export const getThreads = async (req: Request, res: Response) => {
    try {
        const threads = await threadServices.getThreads()
        res.json({
            status: true,
            message: "success",
            data: threads
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
export const getPostAt = async (req: Request, res: Response) => {
    try {
        const postAt = await threadServices.getPostAt()
        res.json({
            status: true,
            message: "success",
            data: postAt
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

export const getThread = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const thread = await threadServices.getThread(+id)

        res.json({
            status: true,
            message: "success",
            data: thread
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

export const getThreadByUserId = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.loginSession.id
        // const userId = req.params
        const thread = await threadServices.getThreadByUserId(+userId)

        res.json({
            status: true,
            message: "success",
            data: thread
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

export const getThreadById = async (req: Request, res: Response) => {
    try {
        // const userId = res.locals.loginSession.id
        const id = req.params.id
        console.log("🚀 ~ getThreadById ~ userId:", id)
        const thread = await threadServices.getThreadById(+id)

        res.json({
            status: true,
            message: "success",
            data: thread
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

export const createThread = async (req: Request, res: Response) => {
    try {
        const { body } = req
        body.userId = res.locals.loginSession.id
        const thread = await threadServices.createThread(
            body,
            req.files as { [fieldname: string]: Express.Multer.File[] }
        )
        res.json({
            status: true,
            message: "success",
            data: thread
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

export const getReplies = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const replies = await threadServices.getReplies(+id)

        res.json({
            status: true,
            message: "Success",
            data: replies
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