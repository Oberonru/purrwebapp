import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @RelationId((column: ColumnEntity) => column.user)
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.columns)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
