import { Response, Request } from "express"
import { loginSchema, registerSchema } from "../utils/validator/AuthValidator"
import * as AuthServices from "../services/AuthServices"
import * as bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";
import * as UserServices from "../services/UserServices";
// import 'dotenv/config'



export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const result = await AuthServices.register(data)

        res.json({
            status: true,
            message: "Success",
            data: result,
            password: data.password
        })
    } catch (error) {
        const err = error as unknown as Error
        console.log(err);

        if (err.message === "Username or Email already Exist") {
            return res.status(400).json({
                status: false,
                message: err.message
            })
        }

        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const token = await AuthServices.login(username, password)

    res.json({
        status: true,
        message: "success",
        data: token
    })
}

export const checkWhoLogin = async (req: Request, res: Response) => {
    const loginSession = res.locals.loginSession
    const response = await AuthServices.checkWhoLogin(loginSession)

    res.json({
        userLogin: response,
    })
}
