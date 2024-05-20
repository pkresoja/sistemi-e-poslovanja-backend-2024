import { Router } from "express";
import { handleRequest } from "../utils";
import { UserService } from "../services/user.service";

export const UserRoute = Router()

UserRoute.post('/login', (req, res) => {
    handleRequest(res, UserService.login(req.body))
})

UserRoute.post('/refresh', (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    handleRequest(res, UserService.refreshToken(token))
})