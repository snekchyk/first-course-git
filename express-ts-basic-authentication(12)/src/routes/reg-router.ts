import {Request, Response, Router} from 'express'
import {userService} from '../domains/users-service.js'

export const regRouter = Router()

regRouter.post('/', async (req: Request, res: Response) => {
    const newUser = await userService.createUser(req.body.login, req.body.password)
    res.status(201).send(newUser)
})

