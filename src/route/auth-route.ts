import { Router } from "express";
import { UserController } from "../controller/user-auth";
import { authenticate } from "../middleware/auth-user";

const userRouter = Router();
const userController = new UserController();



userRouter.post('/user/register', userController.createUser);
userRouter.post('/user/login', userController.login);
userRouter.post('/user/refreshToken', authenticate, userController.refreshToken);
userRouter.post('/user/logout', authenticate, userController.logout);

export default userRouter;