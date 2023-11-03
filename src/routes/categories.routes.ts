
import { Router } from "express";
import { validateBody, validateToken, verifyAdmin } from "../middlewares/globals.middeware";
import { verifyCategoriExists, verifyUniqueCategoriName } from "../middlewares/categories.middeware";
import { createCategoriesSchema } from "../schemas/categories.schema";
import { createCategoryController, readAllCategoriesController, readRealEstateByCategoriesController } from "../controllers/categories.controllers";

export const categoriesRouter = Router()

categoriesRouter.post("/",
    validateBody(createCategoriesSchema), validateToken, verifyUniqueCategoriName, verifyAdmin,
    createCategoryController)

categoriesRouter.get("/", readAllCategoriesController)

categoriesRouter.get("/:id/realEstate",
    verifyCategoriExists,
    readRealEstateByCategoriesController
)

