import { Request, Response } from "express";
import { userService } from "../services/user-auth";
import { ZodError } from "zod";

export class UserController{
    
    userService;
    constructor() {
        this.userService = new userService();
    }

    async createUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req.body;
            console.log({id, body})
            return await this.userService.createUser(id, body)
        }
        
        catch (error) {
            if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
            
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { body } = req.body;
            return await this.userService.login(id, body)
        }
        catch (error) {
             if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
        }
    }


    async refreshToken(req: Request, res: Response) {
        try {
            const { id } = req.params;
            return await this.userService.refreshToken(id)
        }
        catch (error) {
             if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
        }
    }


    async logout(req: Request, res: Response) {
        try {
            const { id } = req.params;
            return await this.userService.logOut(id)
        }
        catch (error) {
             if (error instanceof ZodError) {
                console.log(error)
                return new Error("error validating user input")
            }
        }
    }

}