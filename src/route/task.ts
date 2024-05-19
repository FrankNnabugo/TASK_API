import { Router } from "express";
import { TaskController } from "../controller/task";
const taskController = new TaskController();
const taskRouter = Router();

taskRouter.post("/task/create", taskController.createTask);
taskRouter.post("/task/update", taskController.updateTask);
taskRouter.get("/task/:id", taskController.getTask);
taskRouter.get("/task", taskController.getAllTask);
taskRouter.delete("/task/:id", taskController.deleteTask);

export default taskRouter; 