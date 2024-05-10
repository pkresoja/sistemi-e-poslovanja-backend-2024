import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import { Customer } from "./entities/Customer";
import { Device } from "./entities/Device";
import { Manufacturer } from "./entities/Manufacturer";
import { Model } from "./entities/Model";
import { Service } from "./entities/Service";
import { State } from "./entities/State";
import { Type } from "./entities/Type";
import { User } from "./entities/User";

configDotenv()
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Customer, Device, Manufacturer, Model, Service, State, Type, User],
    logging: false
})