import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menu-dishes')
export class MenuDish extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'name', length: 85 })
  name: string;

  @Column({ type: 'varchar', name: 'description', length: 255 })
  description: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @Column({ type: 'boolean', name: 'is_recommended', default: false })
  isRecommended: boolean;

  @Column({ type: 'boolean', name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'float', name: 'price' })
  price: number;

  @Column({ type: 'varchar', name: 'image_url', length: 255 })
  imageUrl: string;

  @Column({ name: 'author_id', nullable: false })
  authorId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
