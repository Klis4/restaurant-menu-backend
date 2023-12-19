import { Dish } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express"
import { ERROR_CODES } from "../../common/enums";
import DishRepository from "./dish.repository";
import { DISH_FIELD } from "./enums";
import { ICreateDish } from "./interfaces";

function DishService() {
  const dishRepository = DishRepository();

  async function getAllDishes(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dishes = await dishRepository.getAllDishes()

    if (dishes) {
      res.status(200).send(dishes)
    } else {
      res.status(500).send({ errorCode: ERROR_CODES.SERVER_ERROR, message: "Something went wrong" })
    }
    return next()
  }

  async function getDishById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dishId: string = req.path.substring(1);

    const dish = await dishRepository.getById(dishId)

    if (dish) {
      res.status(200).send(dish)
    } else {
      res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "User not found" })
    }
    return next()
  }

  async function createDish(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: ICreateDish = req.body;

      if (DISH_FIELD.NAME, DISH_FIELD.DESCRIPTION, DISH_FIELD.PICTURE_URL, DISH_FIELD.PRICE, DISH_FIELD.CATEGORY_ID in data) {
        const dish = await dishRepository.create(data.name, data.description, data.pictureURL, data.price, data.categoryId);
        if (dish) {
          res.status(200).send(dish);
        } else {
          res.status(500).send({ errorCode: ERROR_CODES.SERVER_ERROR, message: "Something went wrong, try again." })
        }
      } else {
        res.status(400).send({ errorCode: ERROR_CODES.INVALID_DATA, message: "Invalid data" })
      }

    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        res.status(400).send({ errorCode: ERROR_CODES.INVALID_DATA, message: "Invalid data" })
      } else {
        res.status(500).send({ errorCode: ERROR_CODES.SERVER_ERROR, message: "Server error" })
      }
    }
    return next();
  }

  async function editDish(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dishId: string = req.path.substring(1);
    const data: Partial<Dish> = req.body;

    if (dishId && data) {
      const editedDish = await dishRepository.edit(dishId, data?.name, data?.description, data?.pictureURL, data?.price, data?.categoryId)
      if (editedDish) {
        res.status(200).send(editedDish)
      } else {
        res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "Dish not found" })
      }
    } else {
      res.status(400).send({ error_code: ERROR_CODES.INVALID_DATA, message: "Invalid data" })
    }

    return next()
  }

  async function deleteDish(req: Request, res: Response, next: NextFunction): Promise<void> {
    const dishId: string = req.path.substring(1);

    if (dishId) {
      const dish = await dishRepository.deleteOne(dishId)
      if (dish) {
        res.status(200).send(dish)
      } else {
        res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "Dish not found" })
      }
    } else {
      res.status(400).send({ error_code: ERROR_CODES.INVALID_DATA, message: "Invalid data" })
    }

    return next()
  }

  return {
    getAllDishes: getAllDishes,
    getDishById: getDishById,
    createDish: createDish,
    editDish: editDish,
    deleteDish: deleteDish
  }
}

export default DishService