import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('usuarios')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  login: string;

  @Column({ type: 'varchar', length: 100 })
  senha: string;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  alterado_em: Date;

  @OneToMany((type) => Recipe, (r) => r.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'id_usuarios' })
  recipes: Recipe[];
}
