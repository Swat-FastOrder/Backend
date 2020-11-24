import { EntityRepository, Repository } from 'typeorm';
import { MenuCategory } from './menu-category.entity';

@EntityRepository(MenuCategory)
export class MenuCategoryRepository extends Repository<MenuCategory> {}
