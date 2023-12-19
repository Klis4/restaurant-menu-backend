import { Category, PrismaClient } from '@prisma/client'

function CategoryRepository() {
  const prisma = new PrismaClient()

  async function getCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany()
    return categories
  }

  async function getCategoryById(id: Category['id']): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    })
    return category
  }

  async function createCategory(name: Category['name']): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    })
    return category
  }

  async function editCategory(id: Category['id'], name: Category['name']): Promise<Category | null> {
    const currentCategoryData = await getCategoryById(id)
    if (currentCategoryData) {
      const category = await prisma.category.update({
        where: { id: id },
        data: {
          name: name || currentCategoryData.name,
        },
      })
      return category
    }
    return null
  }

  async function deleteCategory(id: Category['id']): Promise<Category | null> {
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    })
    return category
  }

  return {
    getAllCategories: getCategories,
    getById: getCategoryById,
    create: createCategory,
    edit: editCategory,
    deleteOne: deleteCategory,
  }
}

export default CategoryRepository
