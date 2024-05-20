import { Request, Response} from "express";
import { TaskService } from "../services/task";
import { ZodError } from "zod";


export class TaskController {


    taskService;
    constructor() {
        this.taskService = new TaskService()
    }


    async createTask(req: Request, res: Response) {
        try {
            const { body } = req.body;
            return await this.taskService.createTask(body)
        }
        catch (error) {
             if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
        }
    }

    
    async getTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            return await this.taskService.getTask(id)
        }

        catch (error) {
             if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
        }
    }


    async getAllTask(req: Request, res: Response) {
        try {
            return await this.taskService.getAllTask()

        }
        catch (error) {
                console.log(error)
        }
    }


    async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req.body;
            return await this.taskService.updateTask(id, body)
        }

        catch (error) {
             if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
        }
    }


    async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            return await this.taskService.deleteTask(id)
        }

        catch (error) {
             if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
        }
    }

}