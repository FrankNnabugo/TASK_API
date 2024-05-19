import * as z from "zod";


export const createUserSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "name can only be a valid string" })
            .min(5, "name is required"),
        password: z.string({ required_error: "password can only be a valid string" })
        .min(6, "password is required"),
        email: z.string({ required_error: "email can only be a valid string" })
        .min(5, "email is required"),
        phoneNumber: z.string({ required_error: "input a valid phone number" }),
        residentialAddress: z.string({ required_error: "residential address can only be a  valid string" }),
    })
})



export const loginUserSchema = z.object({
    body: z.object({
        Password: z.string({ required_error: "password can only be a valid string" })
            .min(6, "password is required"),
        email: z.string({ required_error: "" })
            .min(1, "email is required")
        .email("valid address is required")
    })
})



export const findUserSchema = z.object({
    params: z.object({
       id: z.number().int()
    })
})



export type CreateUserSchemaInputType = z.infer<typeof createUserSchema>;
export type LoginUserSchemaInputType = z.infer<typeof loginUserSchema>;
export type FindUserSchemaInputType = z.infer<typeof findUserSchema>;