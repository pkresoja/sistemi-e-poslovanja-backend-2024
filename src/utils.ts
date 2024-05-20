import { configDotenv } from "dotenv"
import type { Response } from "express"
import jwt from "jsonwebtoken"

export async function handleRequest(res: Response, callback: Promise<any>) {
    try {
        const data = await callback
        if (data == undefined) {
            res.status(204).send()
            return
        }

        delete data.deletedAt
        res.json(data)
    } catch (e) {
        let code = 500

        if (e.message == "NOT_FOUND")
            code = 404

        res.status(code).json({
            message: e.message,
            timestamp: new Date()
        })
    }
}

export function checkIfDefined(data: any) {
    if (data == undefined)
        throw new Error("NOT_FOUND")
    return data
}

export function sendErrorResponse(res: Response, code = 400, msg = "Bad request") {
    res.status(code).json({
        message: msg,
        timestamp: new Date()
    });
}

configDotenv()
export async function authenticateToken(req, res, next) {
    const unprotected = ['/api/user/login', '/api/user/refresh']
    if (unprotected.includes(req.path)) {
        next()
        return
    }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return sendErrorResponse(res, 401, 'NO_TOKEN')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return sendErrorResponse(res, 403, 'INVALID_TOKEN')
        }
        req.user = user
        next()
    })
}