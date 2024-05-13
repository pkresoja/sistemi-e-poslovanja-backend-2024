import { IsNull } from "typeorm"
import { AppDataSource } from "../db"
import { Device } from "../entities/Device"

const repo = AppDataSource.getRepository(Device)

export class DeviceService {
    static async getAllDevices() {
        return await repo.find({
            select: {
                deviceId: true,
                sn: true,
                createdAt: true,
                updatedAt: true,
                model: {
                    modelId: true,
                    name: true,
                    type: {
                        typeId: true,
                        name: true
                    },
                    manufacturer: {
                        manufacturerId: true,
                        name: true
                    }
                },
                customer: {
                    customerId: true,
                    name: true
                }
            },
            where: {
                model: {
                    type: {
                        deletedAt: IsNull()
                    },
                    manufacturer: {
                        deletedAt: IsNull()
                    },
                    deletedAt: IsNull()
                },
                customer: {
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations: {
                model: {
                    type: true,
                    manufacturer: true
                },
                customer: true
            }
        })
    }
}