
import prisma from "../config/prisma";
import { BadRequestException, NotFoundException } from "../utilities/error-class";
import { CreateTaskInputSchemaType, FindTaskInputSchemaType } from "../validation/task-schema";
import { UpdateTaskDto } from "../@types/types";
import { TaskStatusType } from "../@types/types";


export class TaskService {
    async createTask(body: CreateTaskInputSchemaType['body']) {
        if (!body.title && !body.description) {
            throw new BadRequestException("you need to pass in title and description to create a task")
        }
        const task = await prisma.task.create({
            data: {
                userId: +body.userId,
                title: body.title,
                description: body.description
            }
        });

        return {
            message: "task successfully created",
            data: task
        }

    }

    async getTask(id: FindTaskInputSchemaType['params']) {
        const task = await prisma.task.findUnique({
            where: {
                id: +id.id
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                createdAt: true
            }
        });

        if (!task) {
            throw new NotFoundException ("no task record with the provided found");
        }
        
        return {
            message: " task successfully retrieved",
            data: task
        }
    }


    async getAllTask() {
        const pageSize = 10;
        const perPage = 1;
        const take = pageSize;
        const skip = (perPage - 1) * take;
        const task = await prisma.task.findMany({
            take,
            skip,
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true
            }
        });

        const allTasks = Promise.all(task);
        allTasks.then((result) => {
            return result;
        });

        allTasks.catch((error) => {
            return error;
        });

        return {
            message: 'all task record successfully retrieved',
            data: allTasks
        }
    }



    async updateTask(id: FindTaskInputSchemaType['params'], body: UpdateTaskDto) {
        if (!body.title || !body.description) {
            throw new BadRequestException
                ("you need to pass in at least one of title or description to update a task")
        }

        switch (body.status) {
            case TaskStatusType.ongoing: {
                const task = await prisma.task.update({
                    where: {
                        id: +id.id
                    },
                    data: {
                        title: body.title,
                        description: body.description,
                        status: TaskStatusType.ongoing
                    }
                });
                
                return {
                    message: "task successfully updated",
                    data: task
                }
            }
                
            case TaskStatusType.completed: {
                const task = await prisma.task.update({
                    where: {
                        id: +id.id
                    },
                    data: {
                        title: body.title,
                        description: body.description,
                        status: TaskStatusType.completed
                    }
                });
                return {
                    message: "task successfully updated",
                    data: task
                }
            }
                
        }
    }



    async deleteTask(id: FindTaskInputSchemaType['params']) {
             await prisma.task.delete({
            where: {
                id: +id.id
            }
        });

        return {
            message: "the task with the provided id has successfully been deleted"
        }
    }
}