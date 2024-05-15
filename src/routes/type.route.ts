import { Router } from "express";
import { TypeService } from "../services/type.service";
import { handleRequest } from "../utils";

export const TypeRoute = Router()

TypeRoute.get('/', (req, res) => {
    handleRequest(res, TypeService.getAllTypes())
})

TypeRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, TypeService.getTypeById(id))
})

TypeRoute.post('/', (req, res) => {
    handleRequest(res, TypeService.createType(req.body))
})

TypeRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, TypeService.updateType(id, req.body))
})

TypeRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, TypeService.deleteTypeById(id))
})