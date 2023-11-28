import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users_table')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    //token & tokenSecret


    @Column()
    accessToken: string;

}