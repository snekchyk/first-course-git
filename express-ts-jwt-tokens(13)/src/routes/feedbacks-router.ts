import {Router} from "express";
import {feedBacksService} from '../domains/feedbacks-service.js'
import {authMiddleware} from '../middlewares/auth-middleware.js'

export const sendFeedBacksRouter = Router()

sendFeedBacksRouter.post('/', authMiddleware, async (req, res) => {
    const newComment = await feedBacksService.sendFeedBack(req.body.comment, req.user._id)
    res.status(201).json(newComment)
})


export const getFeedBacksRouter = Router()

getFeedBacksRouter.get('/', async (req, res) => {
    const allFeedBacks = await feedBacksService.getAllFeedBacks()
    res.send(allFeedBacks)
})