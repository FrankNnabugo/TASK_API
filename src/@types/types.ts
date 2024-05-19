export enum TaskStatusType{
    ongoing = "ongoing",
    completed = "completed"
}



export interface UpdateTaskDto{
    title?: string,
    description?: string,
    status: TaskStatusType
}
