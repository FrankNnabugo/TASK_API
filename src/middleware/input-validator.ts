import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateInput = (schema: z.AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body } = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.body = body;
    return next();
  };
};
