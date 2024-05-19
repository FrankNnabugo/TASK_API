import { Request, Response } from "express";
import { userService } from "../services/user-auth";


export class UserController{
    userService;
    constructor() {
        this.userService = new userService();
    }

    async createUser(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req.body;
        return await this.userService.createUser(id, body)
        
    }

    async login(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req.body;
        return await this.userService.login(id, body)
    }


    async refreshToken(req: Request, res: Response) {
        const { id } = req.params;
        return await this.userService.refreshToken(id)
    }


    async logout(req: Request, res: Response) {
        const { id } = req.params;
        return await this.userService.logOut(id)
        
    }

}