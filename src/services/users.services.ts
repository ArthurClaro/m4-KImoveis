import { compare } from "bcryptjs";
import User from "../entities/users.entity";
import { AppError } from "../errors/errors";
import { LoginReturn, UserCreate, UserLogin, UserReadReturn, UserReturn, UserUpdate } from "../interfaces/users.interface";
import { userRepository } from "../repositories";
import { userReturnListSchema, userReturnSchema } from "../schemas/users.schema";
import { sign } from "jsonwebtoken";

export const createUserService = async (data: UserCreate): Promise<UserReturn> => {
    const user: User = userRepository.create(data)

    await userRepository.save(user)

    return userReturnSchema.parse(user)
}


export const loginService = async (data: UserLogin): Promise<LoginReturn> => {
    const { email } = data
    const user: User | null = await userRepository.findOneBy({ email })

    if (!user) { throw new AppError('Invalid credentials', 401) }

    const comparePass = await compare(data.password, user.password)

    if (!comparePass) { throw new AppError('Invalid credentials', 401) }

    const token = sign(
        { email: user.email, admin: user.admin },
        process.env.SECRET_KEY!,
        { subject: String(user.id), expiresIn: process.env.EXPIRES_IN! }
    );

    return { token }
}

export const readAllUserService = async (): Promise<UserReadReturn> => {
    const users: User[] = await userRepository.find()

    return userReturnListSchema.parse(users)
}

export const updateUserService = async (data: UserUpdate, user: User): Promise<UserReturn> => {
    const userUpdate: User = userRepository.create({ ...user, ...data })
    
    await userRepository.save(userUpdate)
   
    return userReturnSchema.parse(userUpdate)
}

export const deleteUserService = async (user: User): Promise<void> => {
    await userRepository.softRemove(user)
}