import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Model } from "./Model";

@Index("uq_type_name", ["name"], { unique: true })
@Entity("type", { schema: "tf_psep_2024" })
export class Type {
  @PrimaryGeneratedColumn({ type: "int", name: "type_id", unsigned: true })
  typeId: number;

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

  @OneToMany(() => Model, (model) => model.type)
  models: Model[];
}
