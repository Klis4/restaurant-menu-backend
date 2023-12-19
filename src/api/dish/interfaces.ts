import { Dish } from "@prisma/client";
import { DISH_FIELD } from "./enums";

export interface ICreateDish {
  [DISH_FIELD.CATEGORY_ID]: Dish[DISH_FIELD.CATEGORY_ID],
  [DISH_FIELD.NAME]: Dish[DISH_FIELD.NAME],
  [DISH_FIELD.DESCRIPTION]: Dish[DISH_FIELD.DESCRIPTION],
  [DISH_FIELD.PICTURE_URL]: Dish[DISH_FIELD.PICTURE_URL],
  [DISH_FIELD.COMPOSITION]: Dish[DISH_FIELD.COMPOSITION],
  [DISH_FIELD.PRICE]: Dish[DISH_FIELD.PRICE]
}