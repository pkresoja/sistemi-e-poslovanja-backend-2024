import { Router } from "express";
import { handleRequest } from "../utils";
import { CustomerService } from "../services/customer.service";

export const CustomerRoute = Router()

CustomerRoute.get('/', (req, res) => {
    handleRequest(res, CustomerService.getAllCustomers())
})