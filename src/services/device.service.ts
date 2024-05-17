import { IsNull } from "typeorm"
import { AppDataSource } from "../db"
import { Device } from "../entities/Device"
import { DeviceModel } from "../models/device.model"
import { checkIfDefined } from "../utils"

const repo = AppDataSource.getRepository(Device)

export class DeviceService {
    static async getAllDevicesByCustomerId(id: number) {
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
                    customerId: id,
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations: {
                model: {
                    type: true,
                    manufacturer: true
                }
            }
        })
    }

    static async getDeviceById(id: number) {
        const data = await repo.findOne({
            select: {
                deviceId: true,
                sn: true,
                modelId: true,
                customerId: true,
                createdAt: true,
                updatedAt: true
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
                deviceId: id,
                deletedAt: IsNull()
            }
        })

        return checkIfDefined(data)
    }

    static async createDevice(model: DeviceModel) {
        return await repo.save({
            sn: model.sn,
            modelId: model.modelId,
            customerId: model.customerId,
            createdAt: new Date()
        })
    }

    static async updateDevice(id: number, model: DeviceModel) {
        const data: Device = await this.getDeviceById(id)
        data.sn = model.sn
        data.modelId = model.modelId
        data.customerId = model.customerId
        data.updatedAt = new Date() 
        return await repo.save(data)
    }

    static async deleteDeviceById(id: number) {
        const data: Device = await this.getDeviceById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}