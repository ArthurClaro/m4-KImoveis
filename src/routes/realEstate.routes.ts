import { Router } from "express";
import { validateBody, validateToken, verifyAdmin } from "../middlewares/globals.middeware";
import { verifyAddressExists } from "../middlewares/realEstate.middeware";
import { createRealEstateController, readRealEstateController } from "../controllers/realEstates.controllers";
import { createRealEstateSchema } from "../schemas/realEstate.schema";

export const realEstateRouter = Router()

realEstateRouter.post("/",
    validateToken, verifyAdmin, validateBody(createRealEstateSchema),
    verifyAddressExists,
    createRealEstateController
)

realEstateRouter.get("/",
    readRealEstateController
)