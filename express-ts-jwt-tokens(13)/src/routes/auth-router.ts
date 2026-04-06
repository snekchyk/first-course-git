import {Request, Response, Router} from 'express'
import {userService} from '../domains/users-service.js'
import {jwtService} from '../application/jwt-service.js'

export const authRouter = Router()

authRouter.post('/', async (req: Request, res: Response) => {
    const user = await userService.checkCredentials(req.body.login, req.body.password)
    if (user) {
        const token = await jwtService.createJWT(user)
        res.status(200).send(token)
    } else {
        res.sendStatus(401)
    }
})