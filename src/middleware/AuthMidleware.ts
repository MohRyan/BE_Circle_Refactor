import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";


const Authentication = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const authHeaders = req.headers.authorization

        if (!authHeaders || !authHeaders?.startsWith("Bearer")) return res.status(401).json({
            message: "unauthorized / token not found"
        })

        const token = authHeaders.split(" ")[1]

        try {
            const loginsession = jwt.verify(token, String(process.env.SECRET_KEY))
            res.locals.loginSession = loginsession
            next()
        } catch (error) {
            return res.status(401).json({ error: "Token is Wrong!" })
        }
    } catch (error) {
        return res.status(401).json({ message: "unauthorized !!" })
    }
}

export default Authentication