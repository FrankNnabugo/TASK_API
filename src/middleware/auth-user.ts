
import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma"
import { NotFoundException, UnAuthenticatedException } from "../utilities/error-class";
import { verifyAccesstoken} from "../utilities/helper";
import { EnvFile } from "../config";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split("")[1];
    if (!token && token?.length === 0) {
        throw new NotFoundException("no authentication token found");
    }
    try {
        
        const verifytoken = await verifyAccesstoken(token, {
            secret: EnvFile.JWT_SECRET
        });
        if (!verifytoken) {
            throw new UnAuthenticatedException("invalid token, cannot unathenticate user")
        }

        const payload = token!.split(".")[1];
        const decodePayload = jwt.decode(payload) as JwtPayload;

        const { id } = decodePayload;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                accessToken: true,
                refreshToken: true
            }
        });

        if (token !== user?.accessToken) {
            throw new UnAuthenticatedException("token mismatch, cannot authenticate user")
        }

        return next()
    }

    catch (error) {
        console.log(error);
        throw new Error()
    }
}
