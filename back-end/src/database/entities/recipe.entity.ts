import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Users } from './users.entity';

@Entity('receitas')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_usuarios: number;

  @Column('int')
  id_categorias: number;

  @Column({ type: 'varchar', length: 45 })
  nome: string;

  @Column('int')
  tempo_preparo_minutos: number;

  @Column('int')
  porcoes: number;

  @Column('text')
  modo_preparo: string;

  @Column('text')
  ingredientes: string;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  alterado_em: Date;

  @ManyToOne((type) => Users, (u) => u.recipes)
  @JoinColumn({ name: 'id_usuarios', referencedColumnName: 'id' })
  user: Users;

  @ManyToOne((type) => Category, (c) => c.recipes)
  @JoinColumn({ name: 'id_categorias', referencedColumnName: 'id' })
  category: Category;
}
