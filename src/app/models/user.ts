import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SharedProp } from "./helpers/sharedProp.helper";
import bcrypt from "bcryptjs";

@Entity("users")
class User extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  attempts: number;

  @Column({ nullable: true })
  type: number;

  @Column()
  rolId: number;

  @Column()
  status: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default User;
