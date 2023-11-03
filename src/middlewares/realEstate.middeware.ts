import { NextFunction, Request, Response } from "express"
import "dotenv/config"
import { AppError } from "../errors/errors";
import { addressRepository, categoriesRepository } from "../repositories";


export const verifyAddressExists = async (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.body
    const addressExists = await addressRepository.findOne({
        where: {
            street: address.street,
            zipCode: address.zipCode,
            city: address.city,
            number: address.number,
            state: address.state,
        }
    })

    if (addressExists) {
        throw new AppError('Address already exists', 409)
    }

    return next()
}
