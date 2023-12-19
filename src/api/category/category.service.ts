import { Category } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
import { ERROR_CODES } from "../../common/enums";
import CategoryRepository from "./category.repository";
import { CATEGORY_FIELD } from "./enums";
import { ICreateCategory } from "./interfaces";

function CategoryService() {
  const categoryRepository = CategoryRepository();

  async function getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    const categories = await categoryRepository.getAllCategories()

    if (categories) {
      res.status(200).send(categories)
    } else {
      res.status(501).send({ errorCode: ERROR_CODES.SERVER_ERROR, message: "Something went wrong" })
    }
    return next()
  }

  async function getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const categoryId: string = req.path.substring(1);

    const category = await categoryRepository.getById(categoryId)

    if (category) {
      res.status(200).send(category)
    } else {
      res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "User not found" })
    }
    return next()
  }

  async function createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data: ICreateCategory = req.body;

    if (CATEGORY_FIELD.NAME in data) {
      const category = await categoryRepository.create(data.name);
      if (category) {
        res.status(200).send(category);
      } else {
        res.status(501).send({ errorCode: ERROR_CODES.SERVER_ERROR, message: "Something went wrong, try again." })
      }
    } else {
      res.status(400).send({ errorCode: ERROR_CODES.INVALID_DATA, message: "Invalid data" })
    }
    return next();
  }

  async function editCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const categoryId: string = req.path.substring(1);
    const data: Partial<Category> = req.body;

    if (categoryId && data?.name) {
      const editedCategory = await categoryRepository.edit(categoryId, data.name)
      if (editedCategory) {
        res.status(200).send(editedCategory)
      } else {
        res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "Category not found" })
      }
    } else {
      res.status(400).send({ error_code: ERROR_CODES.INVALID_DATA, message: "Invalid data" })
    }

    return next()
  }

  async function deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const categoryId: string = req.path.substring(1);

    if (categoryId) {
      const category = await categoryRepository.deleteOne(categoryId)
      if (category) {
        res.status(200).send(category)
      } else {
        res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "Category not found" })
      }
    } else {
      res.status(400).send({ error_code: ERROR_CODES.INVALID_DATA, message: "ID is empty or undefined" })
    }

    return next()
  }

  return {
    getAllCategories: getAllCategories,
    getCategoryById: getCategoryById,
    createCategory: createCategory,
    editCategory: editCategory,
    deleteCategory: deleteCategory
  }
}

export default CategoryService