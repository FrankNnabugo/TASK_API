import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { EnvFile } from "../config";




export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(salt, password);
    return Password;
}



export const verifyPassword = async (password: string, hash: string) => {
    const Password = await bcrypt.compare(password, hash);
    return Password;
};




export const generateAccessToken = async (body: any, secret: any) => {
    const token = await jwt.sign(body, secret,
        {
            expiresIn: EnvFile.ACCESS_TOKEN_EXPIRY_DATE
        }
    );
    return token;
}


export const generateRefreshToken = async (body: any, secret: any) => {
    const token = await jwt.sign(body, secret,{
        expiresIn: EnvFile.REFRESH_TOKEN_EXPIRY_DATE
    }
    );
    return token;
}


export const verifyRefreshToken = async (body: any, secret: any) => {
    const token = await jwt.verify(body, secret);
    return token;
}


export const verifyAccesstoken = async (body: any, secret: any) => {
    const token = await jwt.verify(body, secret)
    return token;
}

export const decodeJwt = async (body: any) => {
    const token = await jwt.decode(body);
    return token;
}