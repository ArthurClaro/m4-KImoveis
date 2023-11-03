import { Request, Response } from "express"
import { createSchedulesService, readAllRealEstateSchedulesService } from "../services/schedules.services"

export const createSchedulesController = async (req: Request, res: Response): Promise<Response> => {
    const { sub } = res.locals.decoded
    await createSchedulesService(req.body, sub)

    return res.status(201).json({ message: 'Schedule created' })
}

export const readAllRealEstateSchedulesController = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params
    const realEstate = await readAllRealEstateSchedulesService(Number(id))
    return res.status(200).json(realEstate)
}


