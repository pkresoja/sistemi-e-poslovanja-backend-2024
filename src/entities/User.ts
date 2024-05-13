import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Service } from "./Service";

@Index("uq_user_username", ["username"], { unique: true })
@Entity("user", { schema: "tf_psep_2024" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("bool", { name: "active", default: () => "'true'" })
  active: boolean;

  @OneToMany(() => Service, (service) => service.createdByUser)
  createdServices: Service[];

  @OneToMany(() => Service, (service) => service.updatedByUser)
  updatedServies: Service[];
}
