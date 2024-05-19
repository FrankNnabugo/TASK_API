import prisma from "../config/prisma";
import { BadRequestException, NotFoundException } from "../utilities/error-class";
import { CreateUserSchemaInputType, LoginUserSchemaInputType, FindUserSchemaInputType } from "../validation/user-schema";
import { generateAccessToken, generateRefreshToken, hashPassword, verifyPassword, verifyRefreshToken } from "../utilities/helper";
import { EnvFile } from "../config";


export class userService {
    async createUser(id: FindUserSchemaInputType['params'], body: CreateUserSchemaInputType['body']) {
        if (!body) {
            throw new BadRequestException('you need to pass in name, password, email to register')
        }
        const user = await prisma.user.findUnique({
            where: {
                id: +id.id
            }
        });
        if (user) {
            throw new BadRequestException('user already exists')
        }
        const hashedPassword = await hashPassword(body.password);
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                phoneNumber: body.phoneNumber,
                residentialAddress: body.residentialAddress,
            
            }
        });

        return {
            message: "user successfully created",
            data: newUser
        }
    }



    async login(id: FindUserSchemaInputType['params'], body: LoginUserSchemaInputType['body']) {
        const registrationEndPoint = `localhost: ${EnvFile.PORT}/Api/V1/user/register`
        if (!body.email && !body.Password) {
            throw new BadRequestException("you need to pass in email and password to login");
        }
        const user = await prisma.user.findUnique({
            where: {
                id: id.id
            }
        });

        if (!user && [user].length === 0) {
            throw new NotFoundException(`user does not exist, click ${registrationEndPoint} to register `)
        }

        const isValidPassword = await verifyPassword(body.Password, user?.password || "");
        if (!isValidPassword) {
            throw new BadRequestException('incorrect password or email')
        } 
        const accessToken = await generateAccessToken(body,
            { secret: EnvFile.JWT_SECRET })

        const refreshToken = await generateRefreshToken(body, {
           secret: EnvFile.REFRESH_TOKEN_SECRET
       })
        
        await prisma.user.update({
            where: {
                id: id.id
            },
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        });
        
        return {
            message: "user successfully loggedIn",
            data: { accessToken, refreshToken }
        }
        
    }




    async refreshToken(id: FindUserSchemaInputType['params']) {
        if (!id.id) {
            throw new BadRequestException('a valid id is required');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id.id
            },
            select: {
                id: true,
                email: true,
                password: true,
                refreshToken: true,
                accessToken: true
            }
        });
        
        if (!user?.refreshToken && user?.refreshToken?.length === 0) {
            throw new NotFoundException("no record of a refresh token found")
        }
        else {

            await verifyRefreshToken(user?.refreshToken, {
                secret: EnvFile.REFRESH_TOKEN_SECRET
            })
        }

        const payload = {
            id: user?.id,
            email: user?.email,
            password: user?.password
        }

        const newAccessToken = await generateAccessToken(payload, {
            secret: EnvFile.JWT_SECRET
        });
        const newRefreshToken = await generateRefreshToken(payload, {
            secret: EnvFile.REFRESH_TOKEN_SECRET
        });


        await prisma.user.update({
            where: {
                id: id.id
            },
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }
        });
    }


    
    async logOut(id: FindUserSchemaInputType['params']) {
        await prisma.user.update({
            select: {
                accessToken: true,
                refreshToken: true
            },
            data: {
                refreshToken: null,
                accessToken: null
            },
            where: {
                id: id.id
            }
        });

        return {
            message: "user successfully loggedOut"
        }
    }
}