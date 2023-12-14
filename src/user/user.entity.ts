import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users_table')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  trelloId: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  accessTokenSecret: string;
}
