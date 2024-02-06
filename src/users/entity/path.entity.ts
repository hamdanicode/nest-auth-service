import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Path extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true})
    code:number;
    
    @Column()
    name:string;

    @Column()
    urlPath:string;

    @Column({length:"255"})
    description:string;

}
// "00128"