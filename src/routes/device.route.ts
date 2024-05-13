import { Router } from "express";
import { handleRequest } from "../utils";
import { DeviceService } from "../services/device.service";

export const DeviceRoute = Router()

DeviceRoute.get('/', (req, res) => {
    handleRequest(res, DeviceService.getAllDevices())
})