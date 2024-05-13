import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Service } from "../entities/Service";

const repo = AppDataSource.getRepository(Service)

export class ServiceService {
    static async getAllServicesByDevice(id: number) {
        return await repo.find({
            select: {
                serviceId: true,
                state: {
                    stateId: true,
                    name: true
                },
                createdAt: true,
                createdByUser: {
                    userId: true,
                    username: true
                },
                updatedAt: true,
                updatedByUser: {
                    userId: true,
                    username: true
                }
            },
            where: {
                device: {
                    deviceId: id,
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
                state: {
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations: {
                state: true,
                createdByUser: true,
                updatedByUser: true
            }
        })
    }

    static async getServiceByCode(code: string) {
        const data = await repo.findOne({
            select: {
                serviceId: true,
                code: true,
                device: {
                    sn: true,
                    model: {
                        name: true,
                        manufacturer: {
                            name: true
                        },
                        type: {
                            name: true
                        }
                    },
                    customer:{
                        name: true,
                        taxId: true
                    }
                },
                state: {
                    name: true
                },
                createdAt: true,
                updatedAt: true,
            },
            where: {
                device: {
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
                state: {
                    deletedAt: IsNull()
                },
                code: code,
                deletedAt: IsNull()
            },
            relations: {
                state: true,
                device:{
                    model: {
                        manufacturer: true,
                        type: true
                    },
                    customer: true
                }
            }
        })

        if (data == undefined)
            throw new Error('SERVICE_NOT_FOUND')

        return data
    }
}