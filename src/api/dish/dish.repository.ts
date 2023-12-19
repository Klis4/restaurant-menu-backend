import { Category, Dish, PrismaClient } from '@prisma/client'

function DishRepository() {
  const prisma = new PrismaClient()

  async function getDishes(): Promise<Dish[]> {
    const dishes = await prisma.dish.findMany()
    return dishes
  }

  async function getDishById(id: Dish['id']): Promise<Dish | null> {
    const dish = await prisma.dish.findUnique({
      where: {
        id: id,
      },
    })
    return dish
  }

  async function createDish(name: Dish['name'], description: Dish['description'], pictureURL: Dish['pictureURL'], price: Dish['price'], categoryId: Category['id'] ): Promise<Dish> {
    const dish = await prisma.dish.create({
      data: {
        name: name,
        description: description,
        pictureURL: pictureURL,
        price: price,
        categoryId: categoryId
      },
    })
    return dish
  }

  async function editDish(id: Dish['id'], name?: Dish['name'], description?: Dish['description'], pictureURL?: Dish['pictureURL'], price?: Dish['price'], categoryId?: Dish['categoryId']): Promise<Dish | null> {
    const currentDishData = await getDishById(id)
    if (currentDishData) {
      const dish = await prisma.dish.update({
        where: { id: id },
        data: {
          name: name || currentDishData.name,
          description: description || currentDishData.description,
          pictureURL: pictureURL || currentDishData.pictureURL,
          price: price || currentDishData.price,
          categoryId: categoryId || currentDishData.categoryId

        },
      })
      return dish
    }
    return null
  }

  async function deleteDish(id: Dish['id']) {
    const dish = await prisma.dish.delete({
      where: {
        id: id,
      },
    })
    return dish
  }

  return {
    getAllDishes: getDishes,
    getById: getDishById,
    create: createDish,
    edit: editDish,
    deleteOne: deleteDish,
  }
}

export default DishRepository
