import { Request, Response } from "express"
import { createCategoriesService, readAllCategoriesService, readRealEstateByCategoriesService } from "../services/categories.services"

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const category = await createCategoriesService(req.body)
    return res.status(201).json(category)
}

export const readAllCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const category = await readAllCategoriesService()
    return res.status(200).json(category)
}

export const readRealEstateByCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const realEstate = await readRealEstateByCategoriesService(Number(id))
    return res.status(200).json(realEstate)
}