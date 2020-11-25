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

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @Column({ type: 'boolean', name: 'is_recommended' })
  isRecommended: boolean;

  @Column({ type: 'boolean', name: 'disabled' })
  disabled: boolean;

  @Column({ type: 'float', name: 'price' })
  price: number;

  @Column({ type: 'varchar', name: 'image_url', length: 255 })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
