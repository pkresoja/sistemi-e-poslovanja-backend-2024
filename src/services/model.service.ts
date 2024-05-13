import { IsNull } from "typeorm"
import { AppDataSource } from "../db"
import { Model } from "../entities/Model"

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
}