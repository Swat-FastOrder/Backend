/**
 * ORDERED: When the diner ordered your dish
 * READY_TO_PREPARE: When the dish is send to kitchen
 * PREPARING: When the chefs are cooking the dish
 * READY_TO_SERVE: The dish is ready to serve
 * SERVED: Dish was served
 */

export enum OrderDetailStatus {
  ORDERED = 'ordered',
  READY_TO_PREPARE = 'ready-to-prepare',
  PREPARING = 'preparing',
  READY_TO_SERVE = 'ready-to-serve',
  SERVED = 'served',
}
