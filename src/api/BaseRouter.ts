import { Router } from "express";
import CategoryRouter from "./category/category.router";
import UserRouter from "./user/user.router";

function BaseRouter (): Router {
  const router = Router({});

  router.use('/user', UserRouter())
  router.use('/category', CategoryRouter())
  
  return router
}

export default BaseRouter