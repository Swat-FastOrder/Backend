import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', name: 'first_name', length: 50 })
  firstname: string;
  @Column({ type: 'varchar', name: 'last_name', length: 50 })
  lastname: string;
  @Column({ type: 'varchar', unique: true, length: 65 })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ name: 'is_active', default: false })
  isActive: boolean;
  // Columns for audit
  @Column({ name: 'author_id', nullable: true })
  authorId: number;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
