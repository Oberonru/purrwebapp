import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

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
}
