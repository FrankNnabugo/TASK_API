import * as z from "zod";



export const createTaskSchema = z.object({
    body: z.object({
        title: z.string()
            .min(1),
        
        description: z.string()
            .min(10),
        userId: z.string({})
    })
})






export type CreateTaskInputSchemaType = z.infer<typeof createTaskSchema>;




