import { Request, Response } from "express"
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/jwt"
import { CreateUserDTO } from "../models/dto/UserDTO"
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

        try{
            const userFromDb = await repository.findByEmail(credentials.email)
        
        if(!userFromDb || !bcrypt.compareSync(credentials.password, userFromDb.password)) {
            res.status(401).json({ message: 'Invalid credentials' })
            return
        }

        const token = generateToken(userFromDb)

        res.json({ token })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' })
        }        
    }

    public readonly register = async (req: Request, res: Response) => {
        const user = req.body as CreateUserDTO

        try {
            await resgisterSchema.validateAsync(user)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }

        const hashedPassword = bcrypt.hashSync(user.password, 10)

        const repository = new UserRepository()

        try {
            const newUser = await repository.create({ ...user, password: hashedPassword })

            res.status(201).json(newUser)
        } catch (error) {
            if (error.code === 'P2002') {
                res.status(409).json({ message: 'User alreadys exist' })
                return
            }
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' })
        }        
    }
}