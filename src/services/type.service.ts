import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Type } from "../entities/Type";

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
}