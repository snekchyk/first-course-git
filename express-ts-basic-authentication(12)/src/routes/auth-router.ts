import {Request, Response, Router} from 'express'
import {userService} from '../domains/users-service.js'

export const authRouter = Router()

authRouter.post('/', async (req: Request, res: Response) => {
    const checkResult = await userService.checkCredentials(req.body.login, req.body.password)
    return res.status(200).send(checkResult)
})

