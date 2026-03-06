import express from 'express'
import {regRouter} from "./routes/reg-router.js";
import {authRouter} from "./routes/auth-router.js";

export const app = express()

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.use('/users/reg', regRouter)
app.use('/users/auth', authRouter)