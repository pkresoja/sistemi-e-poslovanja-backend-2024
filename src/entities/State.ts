import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./Service";

@Entity("state", { schema: "tf_psep_2024" })
export class State {
  @PrimaryGeneratedColumn({ type: "int", name: "state_id", unsigned: true })
  stateId: number;

  @Column("varchar", { name: "name", length: 45 })
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

  @OneToMany(() => Service, (service) => service.state)
  services: Service[];
}
