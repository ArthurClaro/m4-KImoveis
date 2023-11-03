import { Router } from "express";
import { validateBody, validateToken, verifyAdmin } from "../middlewares/globals.middeware";
import { verifyRealEstateExist, verifyRealEstateSchedulesExist, verifyUserSchedulesExist } from "../middlewares/schedules.middeware";
import { createSchedulesController, readAllRealEstateSchedulesController } from "../controllers/schedules.controllers";
import { createSchedulesSchema } from "../schemas/schedules.schema";

export const schedulesRouter = Router()

schedulesRouter.post("/",
    validateToken, validateBody(createSchedulesSchema),
    verifyRealEstateExist, verifyRealEstateSchedulesExist, verifyUserSchedulesExist,
    createSchedulesController
)

schedulesRouter.get("/realEstate/:id",
    validateToken, verifyAdmin,
    readAllRealEstateSchedulesController
)