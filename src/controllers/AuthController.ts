import { Request, Response } from "express"
import { generateToken } from "../lib/jwt"
import { CreateUsertDTO } from "../models/dto/UserDTO"
import UserRepository from "../models/repositories/UserRepository"
import { loginShema, resgisterSchema } from "../models/Validators/userSchemas"

export default class AuthController {
    public readonly login = async (req: Request, res: Response) => {
        const credentials = req.body

        try {
            await loginShema.validateAsync(credentials)
        } catch (err) {
            res.status(400).json({ error: err.message })
            return
        }

        const repository = new UserRepository()
        const userFromDb = await repository.findByEmail(credentials.email)
        
        if(!userFromDb || userFromDb.password !== credentials.password) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const token = generateToken(userFromDb)

        res.json({ token })

    }

    public readonly register = async (req: Request, res: Response) => {
        const user = req.body as CreateUsertDTO

        try {
            await resgisterSchema.validateAsync(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

        const repository = new UserRepository()
        const newUser = await repository.create(user)

        res.status(201).json(newUser)
    }
}