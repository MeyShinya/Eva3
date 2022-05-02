import { Router } from 'express'
import taskController from '../controllers/TaskController'

const taskRoutes = Router()
const controller = new taskController()

taskRoutes.get('/', controller.getAll)
taskRoutes.get('/:id', controller.getById)
taskRoutes.post('/', controller.create)
taskRoutes.put('/:id', controller.update)
taskRoutes.delete('/:id', controller.delete)

export default taskRoutes