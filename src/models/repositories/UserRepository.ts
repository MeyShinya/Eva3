import { PrismaClient } from "@prisma/client";
import { CreateUserDTO, LoginUserDTO, updateUserDTO, UserDTO } from "../dto/UserDTO";

const prisma = new PrismaClient()

export default class UserRepository {
    
    public readonly findAll = async (): Promise<UserDTO[]> => {
        const users = await prisma.user.findMany()
        const usersWithoutPassword = users.map(user => {
            const { password, ...usersWithoutPassword } = user
            return usersWithoutPassword
        })
        return usersWithoutPassword
    }

    public readonly findById = async (id: number): Promise<UserDTO | undefined> => {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        
        if (!user) return

        const { password, ...usersWithoutPassword } = user
        return usersWithoutPassword
    }

    public readonly findByEmail = async (email: string): Promise<LoginUserDTO | undefined> => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) return

        return user
    }

    public readonly create = async (user: CreateUserDTO): Promise<UserDTO> => {
        const newUser = await prisma.user.create({
            data: user
        })

        const { password, ...usersWithoutPassword } = newUser
        return usersWithoutPassword
    }

    public readonly update = async (id: number, user: updateUserDTO): Promise<void> => {
        await prisma.user.update({
            where: {
                id,
            },
            data: user
        })
    }

    public readonly delete = async (id: number): Promise<void> => {
        await prisma.user.delete({
            where: {
                id
            }
        })
    }
}