import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import Category from "./entities/categories.entity";
import Address from "./entities/addresses.entity";
import Schedule from "./entities/schedules.entity";
import RealEstate from "./entities/realEstates.entity";
import { SchedulesRepo } from "./interfaces/schedules.interface";
import { AddressRepo, RealEstateRepo } from "./interfaces/realEstate.interface";
import { CategoriesRepo } from "./interfaces/categories.interface";
import { UsersRepo } from "./interfaces/users.interface";
import User from "./entities/users.entity";


export const categoriesRepository: CategoriesRepo = AppDataSource.getRepository(Category)
export const addressRepository: AddressRepo = AppDataSource.getRepository(Address)
export const userRepository: UsersRepo = AppDataSource.getRepository(User)

export const realEstateRepository: RealEstateRepo = AppDataSource.getRepository(RealEstate)
export const schedulesRepository: SchedulesRepo = AppDataSource.getRepository(Schedule)

