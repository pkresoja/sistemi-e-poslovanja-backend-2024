import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Service } from "../entities/Service";
import { checkIfDefined } from "../utils";
import { ServiceModel } from "../models/service.model";
import { UserService } from "./user.service";

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
                    customer: {
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
                device: {
                    model: {
                        manufacturer: true,
                        type: true
                    },
                    customer: true
                }
            }
        })

        return checkIfDefined(data)
    }

    static async getServiceById(id: number) {
        const data = await repo.findOne({
            select: {
                serviceId: true,
                deviceId: true,
                stateId: true,
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
                serviceId: id,
                deletedAt: IsNull()
            }
        })

        return checkIfDefined(data)
    }

    static async createService(model: ServiceModel, username: string) {
        const user = await UserService.getUserByUsername(username)
        console.log(user)
        return await repo.save({
            code: new Date().getMilliseconds().toString(),
            deviceId: model.deviceId,
            stateId: model.stateId,
            createdAt: new Date(),
            createdBy: user.userId
        })
    }

    static async updateService(id: number, model: ServiceModel, username: string) {
        const user = await UserService.getUserByUsername(username)
        const data = await this.getServiceById(id)
        data.deviceId = model.deviceId
        data.stateId = model.stateId
        data.updatedAt = new Date()
        data.updatedBy = user.userId
        return await repo.save(data)
    }

    static async deleteService(id: number) {
        const data = await this.getServiceById(id)
        data.deletedAt = new Date()
        await repo.save(data)
    }
}