import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import "dotenv/config"
import { AppError } from "../errors/errors";
import { ZodTypeAny } from "zod";



export const validateBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): Response | void => {
    const validated = schema.parse(req.body)
    req.body = validated

    return next()
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (authorization == undefined) {
        throw new AppError("Missing bearer token", 401)
    }
    const token: string = authorization.split(" ")[1]
    const decoded = verify(token, process.env.SECRET_KEY!)
    res.locals = { ...res.locals, decoded }

    return next()
}


export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { admin } = res.locals.decoded
    if (!admin) {
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}


export const verifyPermissions = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { sub, admin } = res.locals.decoded

    if (admin) { return next() }

    if (id !== sub) {
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}
