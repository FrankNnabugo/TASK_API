import { NextFunction, Request, Response } from "express";

export const logger = async (req: Request, res: Response, next: NextFunction)=>{
    console.log({
        path: req.url,
        method: req.method,
        headers: req.headers,
    });
    return next();
}