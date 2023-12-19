import { Dish } from "@prisma/client";
import { CATEGORY_FIELD } from "./enums";

export interface ICreateCategory {
  [CATEGORY_FIELD.ID]: Dish[CATEGORY_FIELD.ID],
  [CATEGORY_FIELD.NAME]: Dish[CATEGORY_FIELD.NAME],
}