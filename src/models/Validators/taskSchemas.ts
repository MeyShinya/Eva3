import Joi from 'joi'
import { CreateTaskDTO, updateTaskDTO } from '../dto/TaskDTO'

export const createTaskSchema: Joi.ObjectSchema<CreateTaskDTO> = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required()
})

export const UpdateTaskDTO: Joi.ObjectSchema<updateTaskDTO> = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required()
})