import { Router } from "express";
import { UserController } from "../controller/user-auth";
import { authenticate } from "../middleware/auth-user";
const userController = new UserController();

const userRouter = Router();




userRouter.post('/user/auth/register', userController.createUser);
userRouter.post('/user/auth/login', userController.login);
userRouter.post('/user/auth/refreshToken', authenticate, userController.refreshToken);
userRouter.post('/user/auth/logout', authenticate, userController.logout);

export default userRouter;

