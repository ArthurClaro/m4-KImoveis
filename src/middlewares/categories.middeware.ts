import { NextFunction, Request, Response } from "express"
import "dotenv/config"
import { AppError } from "../errors/errors";
import { categoriesRepository } from "../repositories";


export const verifyUniqueCategoriName = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body
    const categories = await categoriesRepository.findOneBy({ name })

    if (categories) {
        throw new AppError('Category already exists', 409)
    }

    return next()
}

export const verifyCategoriExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const categories = await categoriesRepository.findOneBy({ id: Number(id) })

    if (!categories) {
        throw new AppError('Category not found', 404)
    }

    return next()
}
