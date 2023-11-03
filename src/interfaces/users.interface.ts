import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { createUserSchema, userLoginSchema, userReturnSchema } from "../schemas/users.schema";
import User from "../entities/users.entity";

export type UserCreate = z.infer<typeof createUserSchema>
export type UserBodyUpdate = Omit<UserCreate, 'admin'>
export type UserUpdate = DeepPartial<UserBodyUpdate>
export type UserReturn = z.infer<typeof userReturnSchema>
export type UserReadReturn = UserReturn[]
export type UserLogin = z.infer<typeof userLoginSchema>
export type LoginReturn = { token: string }

export type UsersRepo = Repository<User>
