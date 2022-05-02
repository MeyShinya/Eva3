export interface BaseUserDTO{
    id?: number
    firstName: string
    lastName: string
    email: string    
}

export interface UserDTO extends BaseUserDTO {
    id: number
}

export interface CreateUsertDTO extends BaseUserDTO {
    password: string
}

export type updateUserDTO = Partial<CreateUsertDTO>

export interface LoginUserDTO extends UserDTO {
    password: string
}

export interface UserTokenPayload {
    id: number
    email: string
    exp: number
    iat: number
}