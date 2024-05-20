import express from "express";
import { TaskController } from "../controller/task";
const taskController = new TaskController();
import { authenticate } from "../middleware/auth-user";
const taskRouter = express.Router();


taskRouter.post("/task/create", authenticate, taskController.createTask);
taskRouter.post("/task/update", authenticate, taskController.updateTask);
taskRouter.get("/task/:id", authenticate, taskController.getTask);
taskRouter.get("/task", authenticate, taskController.getAllTask);
taskRouter.delete("/task/:id", authenticate, taskController.deleteTask);


export default taskRouter; 