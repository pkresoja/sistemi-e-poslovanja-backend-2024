import { Router } from "express";
import { handleRequest } from "../utils";
import { DeviceService } from "../services/device.service";

export const DeviceRoute = Router()

DeviceRoute.get('/customer/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, DeviceService.getAllDevicesByCustomerId(id))
})

DeviceRoute.get('/:id/simple', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, DeviceService.getDeviceWithoutRelationsById(id))
})

DeviceRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, DeviceService.getDeviceById(id))
})

DeviceRoute.post('/', (req, res) => {
    handleRequest(res, DeviceService.createDevice(req.body))
})

DeviceRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, DeviceService.updateDevice(id, req.body))
})

DeviceRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, DeviceService.getDeviceById(id))
})