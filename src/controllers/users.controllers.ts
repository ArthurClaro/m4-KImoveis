import { Request, Response } from "express"
import { UserReturn } from "../interfaces/users.interface"
import { createUserService, deleteUserService, loginService, readAllUserService, updateUserService } from "../services/users.services"


export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createUserService(req.body)
    return res.status(201).json(user)
}

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const token = await loginService(req.body)
    return res.status(200).json(token)
}

export const readAllUserController = async (req: Request, res: Response): Promise<Response> => {
    const users = await readAllUserService()
    return res.status(200).json(users)
}

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals
    const newUser = await updateUserService(req.body, user)
    return res.status(200).json(newUser)
}

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const { user } = res.locals
    await deleteUserService(user)
    return res.status(204).json()
}