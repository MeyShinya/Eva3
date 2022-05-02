import { Request, Response } from "express"
import { CreateTaskDTO, TaskDTO, updateTaskDTO } from "../models/dto/TaskDTO"
import { UserTokenPayload } from "../models/dto/UserDTO"
import TaskRepository from "../models/repositories/TaskRepository"
import { createTaskSchema, UpdateTaskDTO } from "../models/Validators/taskSchemas"

export default class TaskController {
    public readonly getAll = async (req: Request, res: Response) => {
        const user = req.user as UserTokenPayload
        const repository = new TaskRepository(user.id)
        const tasks: TaskDTO [] = await repository.findAll()
        res.json(tasks)
    }

    public readonly getById = async (req: Request, res: Response) => {
        const { id } = req.params
        const user = req.user as UserTokenPayload
        const repository = new TaskRepository(user.id)
        const task = await repository.findById(parseInt(id))

        if (!task){
            res.status(404).json({ message: 'Task not found' })
            return
        }

        res.json(task)
    }

    public readonly create = async (req: Request, res: Response) => {
        const task = req.body as CreateTaskDTO

        try{
            await createTaskSchema.validateAsync(task)
        } catch (error) {
            res.status(400).json({ message: error.message })
            return
        }

        const user = req.user as UserTokenPayload
        const repository = new TaskRepository(user.id)
        const newTask = await repository.create(task)
        
        res.json(newTask)
    }

    public readonly update = async (req: Request, res: Response) => {
        const { id } = req.params
        const task = req.body as updateTaskDTO

        try{
            await UpdateTaskDTO.validateAsync(task)
        } catch (error){
            res.status(400).json({ message: error.message })
            return
        }

        const user = req.user as UserTokenPayload
        const repository = new TaskRepository(user.id)
        await repository.update(parseInt(id), task)
        
        res.sendStatus(204)
    }

    public readonly delete = async (req: Request, res: Response) => {
        const { id } =req.params

        const user = req.user as UserTokenPayload
        const repository = new TaskRepository(user.id)
        await repository.delete(parseInt(id))
        res.sendStatus(204)
    }
}