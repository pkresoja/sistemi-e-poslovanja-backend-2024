import { Router } from "express";
import { handleRequest } from "../utils";
import { ServiceService } from "../services/service.service";
import { RequestModel } from "../models/request.model";

export const ServiceRoute = Router()

ServiceRoute.get('/device/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ServiceService.getAllServicesByDevice(id))
})

ServiceRoute.get('/code/:code', (req, res) => {
    const code = req.params.code
    handleRequest(res, ServiceService.getServiceByCode(code))
})

ServiceRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ServiceService.getServiceById(id))
})

ServiceRoute.post('/', (req: RequestModel, res) => {
    handleRequest(res, ServiceService.createService(req.body, req.user))
})

ServiceRoute.put('/:id', (req: RequestModel, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ServiceService.updateService(id, req.body, req.user))
})

ServiceRoute.delete('/:id', (req: RequestModel, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ServiceService.deleteService(id))
})