import { Router } from 'express'
import UserService from './user.service'

function UserRouter(): Router {
  const userRouter = Router({})
  const userService = UserService()

  userRouter.get('/', userService.getAllUsers)
  userRouter.get('/:id', userService.getUserById)
  userRouter.post('/', userService.createUser)
  userRouter.patch('/:id', userService.editUser)
  userRouter.delete('/:id', userService.deleteUser)

  return userRouter
}

export default UserRouter
