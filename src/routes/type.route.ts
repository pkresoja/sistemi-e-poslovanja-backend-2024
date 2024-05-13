import { Router } from "express";
import { TypeService } from "../services/type.service";
import { handleRequest } from "../utils";

export const TypeRoute = Router()

TypeRoute.get('/', (req, res) => {
    handleRequest(res, TypeService.getAllTypes())
})