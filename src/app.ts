import express, { Application, json } from 'express'
import "dotenv/config"
import "express-async-errors"
import { userRouter } from './routes/users.routes'
import { categoriesRouter } from './routes/categories.routes'
import { handleErros } from './middlewares/handleErros'
import { realEstateRouter } from './routes/realEstate.routes'
import { schedulesRouter } from './routes/schedules.routes'


const app: Application = express()
app.use(json())

app.use("/", userRouter)

app.use("/categories/", categoriesRouter)

app.use("/realEstate/", realEstateRouter)

app.use("/schedules/", schedulesRouter)

app.use(handleErros)

export default app