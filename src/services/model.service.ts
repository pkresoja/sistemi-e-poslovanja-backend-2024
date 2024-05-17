import { IsNull } from "typeorm"
import { AppDataSource } from "../db"
import { Model } from "../entities/Model"
import { checkIfDefined } from "../utils"
import { ModelModel } from "../models/model.model"

const repo = AppDataSource.getRepository(Model)

export class ModelService {
    static async getAllModels() {
        return await repo.find({
            select: {
                modelId: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                type: {
                    typeId: true,
                    name: true
                },
                manufacturer: {
                    manufacturerId: true,
                    name: true
                }
            },
            where: {
                type: {
                    deletedAt: IsNull()
                },
                manufacturer: {
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations: {
                type: true,
                manufacturer: true
            }
        })
    }

    static async createModel(model: ModelModel) {
        return await repo.save({
            name: model.name,
            createdAt: new Date(),
            typeId: model.typeId,
            manufacturerId: model.manufacturerId
        })
    }

    static async getModelById(id: number) {
        const data = await repo.findOne({
            select: {
                modelId: true,
                name: true,
                typeId: true,
                manufacturerId: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                type: {
                    deletedAt: IsNull()
                },
                manufacturer: {
                    deletedAt: IsNull()
                },
                modelId: id,
                deletedAt: IsNull()
            }
        })

        return checkIfDefined(data)
    }

    static async updateModel(id: number, model: ModelModel) {
        const data: Model = await this.getModelById(id)
        data.name = model.name
        data.updatedAt = new Date()
        data.typeId = model.typeId
        data.manufacturerId = model.manufacturerId
        return await repo.save(data)
    }

    static async deleteModelById(id: number) {
        const data: Model = await this.getModelById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}