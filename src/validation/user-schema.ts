import * as z from "zod";


export const createUserSchema = z.object({
    body: z.object({

        name: z.string({
            required_error: "name is required",
            invalid_type_error: "name can only be a valid string"
        })
            .min(2),
        password: z.string({
            required_error: "password is required",
        invalid_type_error: "password can only be a valid string"})
            .min(6),
        
        email: z.string({
            required_error: "email is required",
            invalid_type_error: "email can only be a valid staring"
        })
            .min(6),
        
        phoneNumber: z.string({invalid_type_error: "phone number can only be a valid string"}).nullable(),

        residentialAddress: z.string({invalid_type_error: "address can only be a valid string"}).nullable()
    })
})



export const loginUserSchema = z.object({
    body: z.object({
        Password: z.string({
            required_error: "password is required",
        invalid_type_error: "password can only be a valid string"})
            .min(6),
        
        email: z.string({
            required_error: "email is required",
            invalid_type_error: "email can only be a valid staring"
        })
            .min(6)
        .email()
    })
})





export type CreateUserSchemaInputType = z.infer<typeof createUserSchema>;
export type LoginUserSchemaInputType = z.infer<typeof loginUserSchema>;
