import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Device } from "./Device";
import { State } from "./State";

@Index("fk_service_created_by_idx", ["createdBy"], {})
@Index("fk_service_device_idx", ["deviceId"], {})
@Index("fk_service_state_idx", ["stateId"], {})
@Index("fk_service_updated_by_idx", ["updatedBy"], {})
@Index("uq_service_code", ["code"], { unique: true })
@Entity("service", { schema: "tf_psep_2024" })
export class Service {
  @PrimaryGeneratedColumn({ type: "int", name: "service_id", unsigned: true })
  serviceId: number;

  @Column("varchar", { name: "code", unique: true, length: 255 })
  code: string;

  @Column("int", { name: "device_id", unsigned: true })
  deviceId: number;

  @Column("int", { name: "state_id", unsigned: true, default: () => "'1'" })
  stateId: number;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("int", { name: "created_by", unsigned: true })
  createdBy: number;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "updated_by", nullable: true, unsigned: true })
  updatedBy: number | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.createdServices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "userId" }])
  createdByUser: User;

  @ManyToOne(() => Device, (device) => device.services, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "device_id", referencedColumnName: "deviceId" }])
  device: Device;

  @ManyToOne(() => State, (state) => state.services, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "state_id", referencedColumnName: "stateId" }])
  state: State;

  @ManyToOne(() => User, (user) => user.updatedServies, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "updated_by", referencedColumnName: "userId" }])
  updatedByUser: User;
}
