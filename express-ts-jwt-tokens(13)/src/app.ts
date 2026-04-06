import express from 'express'
import {regRouter} from "./routes/reg-router.js";
import {authRouter} from "./routes/auth-router.js";
import {sendFeedBacksRouter} from "./routes/feedbacks-router.js";
import {getFeedBacksRouter} from "./routes/feedbacks-router.js";

export const app = express()

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.use('/users/reg', regRouter)
app.use('/users/auth', authRouter)
app.use('/send/feedback/', sendFeedBacksRouter)
app.use('/get/feedback', getFeedBacksRouter)