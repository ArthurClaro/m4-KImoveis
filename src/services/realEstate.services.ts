import Address from "../entities/addresses.entity";
import Category from "../entities/categories.entity";
import RealEstate from "../entities/realEstates.entity";
import { AppError } from "../errors/errors";
import { CreateRealEstate } from "../interfaces/realEstate.interface";
import { addressRepository, categoriesRepository, realEstateRepository } from "../repositories";

export const createRealEstateService = async (data: CreateRealEstate): Promise<RealEstate> => {
    const category: Category | null = await categoriesRepository.findOneBy({ id: data.categoryId })

    if (!category) { throw new AppError('Category not found', 404) }

    const address: Address = await addressRepository.save(data.address)
    const realEstate: RealEstate = await realEstateRepository.save({ ...data, address, category: category! })

    return realEstate
}

export const readRealEstateService = async (): Promise<RealEstate[]> => {
    return await realEstateRepository.find({
        relations: {
            address: true
        }
    })
}