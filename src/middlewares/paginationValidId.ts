import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Repository } from "typeorm"
import { User } from "../entities"

export const paginationValidId = async (req: Request, res: Response, next: NextFunction) => {
    let order = 'ASC'
    if (req.query.order) {
        order = `${req.query.order}`
    }
    const sort = req.query.sort;
    let sort2 = {}

    if (sort == "price") {
        sort2 = { price: order }
    } else if (sort == "duration") {
        sort2 = { duration: order }
    }

    const movieRepository: Repository<User> = AppDataSource.getRepository(User)
    const movieCount = await movieRepository.find()

    let page: number = Number(req.query.page) || 1;
    let perPage: number = Number(req.query.perPage) || 5;
    if (page <= 0) {
        page = 1
    }
    if (perPage <= 0 || perPage > 5) {
        perPage = 5
    }

    let prevPage: string | null = `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
    let nextPage: string | null = `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`

    if (page <= 1) {
        prevPage = null
    }
    if (movieCount.length < (page * perPage)) {
        nextPage = null
    }

    const pagination = {
        page,
        perPage,
        prevPage,
        nextPage,
        sort2,
        order,
        movieCount
    }
    res.locals = { ...res.locals, pagination }

    return next()
}