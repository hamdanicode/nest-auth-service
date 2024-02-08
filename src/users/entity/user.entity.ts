import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "src/roles/entity/role.entity";
import * as bcript from "bcrypt"
import { RefreshToken } from "src/auth/entity/refreshToken.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column()
    username:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column()
    salt:string;

    
    @ManyToOne(() => Role, (role) => role.user)
    role: Role

    @OneToMany(()=>RefreshToken,(refreshToken)=>refreshToken.user,{eager:true})
    refreshTokens:RefreshToken[]

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    async validatePassword(password:string):Promise<boolean>{
        const hash= await bcript.hash(password,this.salt)
        return hash=== this.password;
    }
}