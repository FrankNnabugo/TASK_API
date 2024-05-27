import { Router } from "express";
import userRouter from "./auth-route";
import taskRouter from "./task";
const router = Router()

router.use('Api/v1', userRouter);
router.use('Api/v1', taskRouter);

export default router;