import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { ColumnEntity } from 'src/column/column.entity';
import { hash } from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  trelloId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  accessTokenSecret: string;

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];
}
