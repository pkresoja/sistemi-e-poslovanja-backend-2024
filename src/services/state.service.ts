import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { State } from "../entities/State";
import { NameModel } from "../models/name.model";

const repo = AppDataSource.getRepository(State)

export class StateService {
    static async getAllStates() {
        return await repo.find({
            select: {
                stateId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }

    static async getStateById(id: number) {
        const data = await repo.findOne({
            select: {
                stateId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                stateId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error("NOT_FOUND")

        return data
    }

    static async createState(model: NameModel) {
        const data = await repo.save({
            name: model.name,
            createdAt: new Date()
        })

        delete data.deletedAt;
        return data
    }

    static async updateState(id: number, model: NameModel) {
        const data = await this.getStateById(id)
        data.name = model.name
        data.updatedAt = new Date()

        const newData = await repo.save(data)
        delete newData.deletedAt;
        return newData
    }

    static async deleteStateById(id: number) {
        const data = await this.getStateById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}