import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Manufacturer } from "../entities/Manufacturer";
import { NameModel } from "../models/name.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Manufacturer)

export class ManufacturerService {
    static async getAllManufacturers() {
        return await repo.find({
            select: {
                manufacturerId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getManufacturerById(id: number) {
        const data = await repo.findOne({
            select: {
                manufacturerId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                manufacturerId: id,
                deletedAt: IsNull()
            }
        })

        return checkIfDefined(data)
    }

    static async createManufacturer(model: NameModel) {
        return await repo.save({
            name: model.name,
            createdAt: new Date()
        })
    }

    static async updateManufacturer(id: number, model: NameModel) {
        const data = await this.getManufacturerById(id)
        data.name = model.name
        data.updatedAt = new Date()
        return await repo.save(data)
    }

    static async deleteManufacturerById(id: number) {
        const data = await this.getManufacturerById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}