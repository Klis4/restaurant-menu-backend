import { Router } from 'express'
import DishService from './dish.service'

function DishRouter(): Router {

  const dishRouter = Router({})
  const dishService = DishService()

  dishRouter.get('/', dishService.getAllDishes)
  dishRouter.get('/:id', dishService.getDishById)
  dishRouter.post('/', dishService.createDish)
  dishRouter.patch('/:id', dishService.editDish)
  dishRouter.delete('/:id', dishService.deleteDish)

  return dishRouter
}

export default DishRouter
