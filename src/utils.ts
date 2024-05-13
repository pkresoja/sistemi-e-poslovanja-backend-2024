import type { Response } from "express"

export async function handleRequest(res: Response, callback: Promise<any>, code: number = 500) {
    try {
        res.json(await callback)
    } catch (e) {
        res.status(code).json({
            message: e.message,
            timestamp: new Date()
        })
    }
}