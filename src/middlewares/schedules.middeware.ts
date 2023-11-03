import { NextFunction, Request, Response } from "express"
import "dotenv/config"
import { AppError } from "../errors/errors";
import {  realEstateRepository, schedulesRepository } from "../repositories";
import { Schedule } from "../entities";


export const verifyRealEstateExist = async (req: Request, res: Response, next: NextFunction) => {
    const { realEstateId } = req.body
    const realEstate = await realEstateRepository.findOne({
        where: {
            id: Number(realEstateId)
        }
    })
    if (!realEstate) {
        throw new AppError('RealEstate not found', 404)
    }

    return next()
}

export const verifyRealEstateSchedulesExist = async (req: Request, res: Response, next: NextFunction) => {
    const { realEstateId, hour, date } = req.body

    const schedules = await schedulesRepository.findOne({
        where: {
            realEstate: {
                id: Number(realEstateId)
            },
            hour,
            date
        }
    })

    if (schedules) {
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }

    return next()
}

export const verifyUserSchedulesExist = async (req: Request, res: Response, next: NextFunction) => {
    let { sub } = res.locals.decoded
    sub = Number(sub)
    const { hour, date } = req.body

    const schedules: Schedule | null = await schedulesRepository.findOne({
        where: {
            user: {
                id: sub
            },
            date,
            hour
        }
    })

    if (schedules) {
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }

    return next()
}
