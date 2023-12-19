import { Router } from 'express'
import CategoryService from './category.service'

function CategoryRouter(): Router {

  const categoryRouter = Router({})
  const categoryService = CategoryService()

  categoryRouter.get('/', categoryService.getAllCategories)
  categoryRouter.get('/:id', categoryService.getCategoryById)
  categoryRouter.post('/', categoryService.createCategory)
  categoryRouter.patch('/:id', categoryService.editCategory)
  categoryRouter.delete('/:id', categoryService.deleteCategory)

  return categoryRouter
}

export default CategoryRouter
