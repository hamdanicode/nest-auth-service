import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    name:string;

    @Column()
    slug:string;

    @Column()
    access:string;

    @OneToMany(() => User, (user) => user.role)
    user: User[]
}