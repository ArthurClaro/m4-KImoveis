import { NextFunction, Request, Response } from "express"
import "dotenv/config"
import { AppError } from "../errors/errors";
import { addressRepository, categoriesRepository, userRepository } from "../repositories";


export const verifyUniqueUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    const user = await userRepository.findOneBy({ email })

    if (user) {
        throw new AppError('Email already exists', 409)
    }

    return next()
}

export const verifyUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const user = await userRepository.findOneBy({ id: Number(id) })

    if (!user) {
        throw new AppError('User not found', 404)
    }

    res.locals = { ...res.locals, user }

    return next()
}
