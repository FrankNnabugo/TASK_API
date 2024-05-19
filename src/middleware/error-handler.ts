import { PrismaClientInitializationError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utilities/error-class";
import { z } from "zod";


export const handleError = async (err: Error,
    req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        name: err.message,
        message: err.stack,
        stack: err.stack,
    });

    if (err instanceof PrismaClientUnknownRequestError) {
        res.json({
            message: err.message,
            name: err.name,
            stack: err.stack
        });
    }

    if (err instanceof ApiError) {
        res.json({
            message: err.message,
            name: err.name,
            stack: err.stack,
            code: err.statuscode
        })
    }
    
    if (err instanceof z.ZodError) {
        res.json({
            message: err.issues,
            message1: err.message,
            name: err.name,
            stack: err.name
        })
    }
}