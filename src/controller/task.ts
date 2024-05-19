import { Request, Response} from "express";
import { TaskService } from "../services/task";


export class TaskController {
    taskService;
    constructor() {
        this.taskService = new TaskService()
    }


    async createTask(req: Request, res: Response) {
        const { body } = req.body;
        return await this.taskService.createTask(body)
    }

    
    async getTask(req: Request, res: Response) {
        const { id } = req.params;
        return await this.taskService.getTask(id)
    }


    async getAllTask(req: Request, res: Response) {
        return await this.taskService.getAllTask()
    }


    async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req.body;
        return await this.taskService.updateTask(id, body)
    }


    async deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        return await this.taskService.deleteTask(id)
    }

}