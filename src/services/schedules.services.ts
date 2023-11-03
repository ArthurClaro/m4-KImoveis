import { CreateSchedules } from "../interfaces/schedules.interface";
import { realEstateRepository, schedulesRepository, userRepository } from "../repositories";
import { AppError } from "../errors/errors";
import RealEstate from "../entities/realEstates.entity";
import User from "../entities/users.entity";

export const createSchedulesService = async (data: CreateSchedules, userId: number): Promise<void> => {
    const newDate = new Date(data.date).getDay()
    if (newDate == 0 || newDate == 6) { throw new AppError('Invalid date, work days are monday to friday', 400) }
    const time = Number(data.hour.split(':')[0])
    if (time < 8 || time > 18) { throw new AppError('Invalid hour, available times are 8AM to 18PM', 400) }

    const realEstate: RealEstate | null = await realEstateRepository.findOneBy({ id: data.realEstateId })
    const user: User | null = await userRepository.findOneBy({ id: userId })

    await schedulesRepository.save({ ...data, realEstate: realEstate!, user: user! })
}

export const readAllRealEstateSchedulesService = async (id: number): Promise<RealEstate> => {
    const realEstate: RealEstate | null = await realEstateRepository.findOne({
        where: {
            id
        },
        relations: {
            schedules: {
                user: true
            },
            address: true,
            category: true
        }
    })
    if (!realEstate) { throw new AppError('RealEstate not found', 404) }

    return realEstate
}