import { EntityRepository, Repository } from 'typeorm';
import { MenuDish } from './menu-dishes.entity';

@EntityRepository(MenuDish)
export class MenuDishesRepository extends Repository<MenuDish> {}
