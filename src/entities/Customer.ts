import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Device } from "./Device";

@Index("email_UNIQUE", ["email"], { unique: true })
@Entity("customer", { schema: "tf_psep_2024" })
export class Customer {
  @PrimaryGeneratedColumn({ type: "int", name: "customer_id", unsigned: true })
  customerId: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "phone", length: 255 })
  phone: string;

  @Column("int", { name: "tax_id", nullable: true, unsigned: true })
  taxId: number | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Device, (device) => device.customer)
  devices: Device[];
}
