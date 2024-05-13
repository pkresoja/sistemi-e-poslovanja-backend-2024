import { Router } from "express";
import { handleRequest } from "../utils";
import { ManufacturerService } from "../services/manufacturer.service";

export const ManufacturerRoute = Router()

ManufacturerRoute.get('/', (req, res) => {
    handleRequest(res, ManufacturerService.getAllManufacturers())
})