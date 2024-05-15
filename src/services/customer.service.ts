import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Customer } from "../entities/Customer";
import { CustomerModel } from "../models/customer.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Customer)

export class CustomerService {
    static async getAllCustomers() {
        return await repo.find({
            select: {
                customerId: true,
                name: true,
                email: true,
                phone: true,
                taxId: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getCustomerById(id: number) {
        const data = await repo.findOne({
            select: {
                customerId: true,
                name: true,
                email: true,
                phone: true,
                taxId: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                customerId: id,
                deletedAt: IsNull()
            }
        })

        return checkIfDefined(data)
    }

    static async createCustomer(model: CustomerModel) {
        return await repo.save({
            name: model.name,
            email: model.email,
            phone: model.phone,
            taxId: model.taxId,
            createdAt: new Date()
        })
    }

    static async updateCustomer(id: number, model: CustomerModel) {
        const data = await this.getCustomerById(id);
        data.name = model.name
        data.email = model.email
        data.phone = model.phone
        data.taxId = model.taxId
        data.updatedAt = new Date()
        return await repo.save(data)
    }

    static async deleteCustomerById(id: number) {
        const data = await this.getCustomerById(id);
        data.deletedAt = new Date()
        await repo.save(data)
    }
}