import { Router } from 'express'
import tokenValidator from '../middlewares/tokenValidator'
import authRoutes from './authRoutes'
import healthRoutes from './healthRoutes'
import noteRoutes from './taskRoutes'

const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
apiRoutes.use('/task', tokenValidator(), noteRoutes)
apiRoutes.use('/auth', authRoutes)

export default apiRoutes
