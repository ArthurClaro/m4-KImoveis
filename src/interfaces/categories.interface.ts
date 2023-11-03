import { z } from "zod";
import { Repository } from "typeorm";
import { createCategoriesSchema, readAllCategoriesSchema } from "../schemas/categories.schema";
import Category from "../entities/categories.entity";

export type CreateCategories = z.infer<typeof createCategoriesSchema>
export type ReadAllCategories = z.infer<typeof readAllCategoriesSchema>
export type CategoriesRepo = Repository<Category>
