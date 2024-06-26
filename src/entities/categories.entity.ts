import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./realEstates.entity";

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45, unique: true })
    name: string

    @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
    realEstate: Array<RealEstate>
    
}

export default Category;