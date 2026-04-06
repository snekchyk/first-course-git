import { NextFunction, Request, Response } from 'express'
import {jwtService} from '../application/jwt-service.js'
import {userService} from "../domains/users-service.js"


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    debugger;
    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    console.log(req.headers.authorization.split(' ')[1])
    const token = req.headers.authorization.split(' ')[1]

    console.log(111)
    const userId = await jwtService.getUserIdByToken(token as string)
    console.log(222)
    console.log(userId)
    if (userId) {
        console.log(333)
        req.user = await userService.getUserById(userId)
        console.log(444)
        console.log(req.user)
        next()
        console.log(555)
        return;
    }

    res.sendStatus(401)
}