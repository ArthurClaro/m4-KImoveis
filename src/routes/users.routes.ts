import { Router } from "express";
import { validateBody, validateToken, verifyAdmin, verifyPermissions } from "../middlewares/globals.middeware";
import { verifyUniqueUserEmail, verifyUserExists } from "../middlewares/users.middeware";
import { createUserController, deleteUserController, loginController, readAllUserController, updateUserController } from "../controllers/users.controllers";
import { createUserSchema, updateUserSchema } from "../schemas/users.schema";

export const userRouter = Router()

userRouter.post("/users",
    validateBody(createUserSchema), verifyUniqueUserEmail,
    createUserController
    )

userRouter.get("/users",
    validateToken, verifyAdmin,
    // getUser
    readAllUserController
    )

userRouter.patch("/users/:id",
    validateBody(updateUserSchema), validateToken, verifyUserExists, verifyPermissions,
    // patchUser
    updateUserController
    )

userRouter.delete("/users/:id",
    validateToken, verifyUserExists, verifyPermissions,
    // deleteUser
    deleteUserController
    )


userRouter.post("/login", loginController)

