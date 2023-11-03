import { categoriesRepository, userRepository } from "../repositories";
import { CreateCategories, ReadAllCategories } from "../interfaces/categories.interface";
import Category from "../entities/categories.entity";
import { AppError } from "../errors/errors";

export const createCategoriesService = async (data: CreateCategories): Promise<Category> => {
    return await categoriesRepository.save(data)
}

export const readAllCategoriesService = async (): Promise<ReadAllCategories> => {
    return await categoriesRepository.find()
}

export const readRealEstateByCategoriesService = async (id: number): Promise<Category> => {
    const categori: Category | null = await categoriesRepository.findOne({
        where: {
            id
        },
        relations: {
            realEstate: true
        }
    })
    if (!categori) {
        throw new AppError('Cateory not found', 404)
    }
    return categori
}