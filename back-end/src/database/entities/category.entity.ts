import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('categorias')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome: string;

  @OneToMany((type) => Recipe, (r) => r.category)
  @JoinColumn({ name: 'id', referencedColumnName: 'id_categorias' })
  recipes: Recipe[];
}
