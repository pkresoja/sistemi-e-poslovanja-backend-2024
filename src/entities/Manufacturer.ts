import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Model } from "./Model";

@Index("uq_manufacturer_name", ["name"], { unique: true })
@Entity("manufacturer", { schema: "tf_psep_2024" })
export class Manufacturer {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "manufacturer_id",
    unsigned: true,
  })
  manufacturerId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Model, (model) => model.manufacturer)
  models: Model[];
}
