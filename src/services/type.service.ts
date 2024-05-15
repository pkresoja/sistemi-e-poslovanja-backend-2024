import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Type } from "../entities/Type";
import { NameModel } from "../models/name.model";

const repo = AppDataSource.getRepository(Type)

export class TypeService {
    static async getAllTypes() {
        return await repo.find({
            select: {
                typeId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getTypeById(id: number) {
        const data = await repo.findOne({
            select: {
                typeId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                typeId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error("NOT_FOUND")

        return data
    }

    static async createType(model: NameModel) {
        const data = await repo.save({
            name: model.name,
            createdAt: new Date()
        })

        delete data.deletedAt;
        return data
    }

    static async updateType(id: number, model: NameModel) {
        const data = await this.getTypeById(id)
        data.name = model.name
        data.updatedAt = new Date()

        const newData = await repo.save(data)
        delete newData.deletedAt;
        return newData
    }

    static async deleteTypeById(id: number) {
        const data = await this.getTypeById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}