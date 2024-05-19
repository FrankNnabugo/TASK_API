import * as z from "zod";



export const createTaskSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'title should be a valid string' })
            .min(1, "title is required"),
        description: z.string({ required_error: "description should be a valid string" })
            .min(1, "description is required"),
        userId: z.string({})
    })
})






export type CreateTaskInputSchemaType = z.infer<typeof createTaskSchema>;




