import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Device } from "./Device";
import { Manufacturer } from "./Manufacturer";
import { Type } from "./Type";

@Index("fk_model_manufacturer_idx", ["manufacturerId"], {})
@Index("fk_model_type_idx", ["typeId"], {})
@Index("uq_model_name", ["name"], { unique: true })
@Entity("model", { schema: "tf_psep_2024" })
export class Model {
  @PrimaryGeneratedColumn({ type: "int", name: "model_id", unsigned: true })
  modelId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("int", { name: "manufacturer_id", unsigned: true })
  manufacturerId: number;

  @Column("int", { name: "type_id", unsigned: true })
  typeId: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Device, (device) => device.model)
  devices: Device[];

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "manufacturer_id", referencedColumnName: "manufacturerId" },
  ])
  manufacturer: Manufacturer;

  @ManyToOne(() => Type, (type) => type.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "type_id", referencedColumnName: "typeId" }])
  type: Type;
}
