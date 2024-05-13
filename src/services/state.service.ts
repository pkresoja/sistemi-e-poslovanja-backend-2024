import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { State } from "../entities/State";

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
}