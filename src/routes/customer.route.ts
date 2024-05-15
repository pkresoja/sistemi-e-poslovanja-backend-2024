import { Router } from "express";
import { handleRequest } from "../utils";
import { CustomerService } from "../services/customer.service";

export const CustomerRoute = Router()

CustomerRoute.get('/', (req, res) => {
    handleRequest(res, CustomerService.getAllCustomers())
})

CustomerRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, CustomerService.getCustomerById(id))
})

CustomerRoute.post('/', (req, res) => {
    handleRequest(res, CustomerService.createCustomer(req.body))
})

CustomerRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, CustomerService.updateCustomer(id, req.body))
})

CustomerRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, CustomerService.deleteCustomerById(id))
})