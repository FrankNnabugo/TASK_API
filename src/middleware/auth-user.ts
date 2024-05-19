
import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma"
import { NotFoundException, UnAuthenticatedException } from "../utilities/error-class";
import { verifyAccesstoken} from "../utilities/helper";
import { EnvFile } from "../config";


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            email: true,
            password: true,
            accessToken: true,
            refreshToken: true
        }
    });

    if ((!user?.accessToken && !user?.refreshToken) &&
        (user?.accessToken?.length === 0 && user.refreshToken?.length === 0)) {
        throw new NotFoundException
            ("no record of access token or refresh token found");
       
    }

    const payload = {
        id: user?.id,
        email: user?.email,
        password: user?.password
    }

    const tokenVerify = await verifyAccesstoken(payload, {
        secret: EnvFile.JWT_SECRET
    });
    
    if (!tokenVerify) {
        throw new UnAuthenticatedException("access denied, provide a valid accessTokens")
     }


    return next();
}