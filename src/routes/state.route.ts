import { Router } from "express";
import { handleRequest } from "../utils";
import { StateService } from "../services/state.service";

export const StateRoute = Router()

StateRoute.get('/', (req, res) => {
    handleRequest(res, StateService.getAllStates())
})

StateRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, StateService.getStateById(id))
})

StateRoute.post('/', (req, res) => {
    handleRequest(res, StateService.createState(req.body))
})

StateRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, StateService.updateState(id, req.body))
})

StateRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, StateService.deleteStateById(id))
})