import { User, UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
import { ERROR_CODES } from "../../common/enums";
import { USER_FIELD } from "./enums";
import { ICreateUser } from "./interfaces";
import UserRepository from "./user.repository";

function UserService() {
  const userRepository = UserRepository();

  async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const users = await userRepository.getUsers()

    if (users) {
      res.status(200).send(users)
    } else {
      res.status(501).send({ errorCode: ERROR_CODES.SERVER_ERROR, message: "Something went wrong" })
    }
    return next()
  }

  async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId: string = req.path.substring(1);

    const user = await userRepository.getById(userId)

    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "User not found" })
    }
    return next()
  }

  async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const data: ICreateUser = req.body;
    if (USER_FIELD.NAME, USER_FIELD.EMAIL, USER_FIELD.PASSWORD in data) {
      const currentDate = new Date();
      const user = await userRepository.create(data.name, data.email, data.password, currentDate, UserRole.USER)
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(501).send({
          errorCode: ERROR_CODES.SERVER_ERROR,
          message: "Cannot create user"
        })
      }
    } else {
      res.status(400).send({
        errorCode: ERROR_CODES.INVALID_DATA,
        message: "Name, email or password is undefined"
      })
    }

    return next();
  }

  async function editUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId: string = req.path.substring(1);
    const data: Partial<User> = req.body;

    if (userId) {
      const editedUser = await userRepository.edit(userId, data?.name, data?.email, data?.password, data?.role)
      if (editedUser) {
        res.status(200).send(editedUser)
      } else {
        res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "User not found" })
      }
    } else {
      res.status(400).send({ error_code: ERROR_CODES.INVALID_DATA, message: "ID is empty or undefined" })
    }

    return next()
  }

  async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId: string = req.path.substring(1);

    if (userId) {
      const user = await userRepository.deleteOne(userId)
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(404).send({ errorCode: ERROR_CODES.NOT_FOUND, message: "User not found" })
      }
    } else {
      res.status(400).send({ error_code: ERROR_CODES.INVALID_DATA, message: "ID is empty or undefined" })
    }

    return next()
  }

  return {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    editUser: editUser,
    deleteUser: deleteUser
  }
}

export default UserService