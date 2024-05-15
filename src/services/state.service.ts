import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { State } from "../entities/State";
import { NameModel } from "../models/name.model";
import { checkIfDefined } from "../utils";

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

        return checkIfDefined(data)
    }

    static async createState(model: NameModel) {
        return await repo.save({
            name: model.name,
            createdAt: new Date()
        })
    }

    static async updateState(id: number, model: NameModel) {
        const data = await this.getStateById(id)
        data.name = model.name
        data.updatedAt = new Date()
        return await repo.save(data)
    }

    static async deleteStateById(id: number) {
        const data = await this.getStateById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}