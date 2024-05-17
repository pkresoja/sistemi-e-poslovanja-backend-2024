import { Router } from "express";
import { handleRequest } from "../utils";
import { ModelService } from "../services/model.service";

export const ModelRoute = Router()

ModelRoute.get('/', (req, res) => {
    handleRequest(res, ModelService.getAllModels())
})

ModelRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ModelService.getModelById(id))
})

ModelRoute.post('/', (req, res) => {
    handleRequest(res, ModelService.createModel(req.body))
})

ModelRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ModelService.updateModel(id, req.body))
})

ModelRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ModelService.deleteModelById(id))
})