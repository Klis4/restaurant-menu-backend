import { User } from "@prisma/client";
import { USER_FIELD } from "./enums";

export interface ICreateUser {
  [USER_FIELD.NAME]: User['name'],
  [USER_FIELD.EMAIL]: User['email'],
  [USER_FIELD.PASSWORD]: User['password'],
}