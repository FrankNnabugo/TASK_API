import { PrismaClientInitializationError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utilities/error-class";
import { z } from "zod";


export const handleError = async (err: Error,
    req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    console.log({
        name: err.message,
        message: err.stack,
        stack: err.stack,
    });

    if (err instanceof PrismaClientUnknownRequestError) {
        console.log({
            message: err.message,
            name: err.name,
            stack: err.stack
        });
    }

    if (err instanceof ApiError) {
        console.log({
            message: err.message,
            name: err.name,
            stack: err.stack,
            code: err.statuscode
        })
    }
    
    if (err instanceof z.ZodError) {
        console.log({
            issues: err.issues,
            message: err.message,
            name: err.name,
            stack: err.name
        })
    }
}