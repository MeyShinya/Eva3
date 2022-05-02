export interface BaseTaskDTO{
    id?: number
    title: string
    content: string
    userId: number | null
}

export interface TaskDTO extends BaseTaskDTO {
    id: number
}

export interface CreateTaskDTO extends BaseTaskDTO {}

export interface updateTaskDTO extends Partial<BaseTaskDTO> {}