import { Router } from "express";
import UserRouter from "./user/user.router";

function BaseRouter (): Router {
  const router = Router({});

  router.use('/user', UserRouter())

  return router
}

export default BaseRouter