import express, {Express} from 'express'
import {db, DBType} from '../db/db.js'
import {HTTP_STATUSES} from "./courses.js";

export const getTestsRouter = (db: DBType) => {

    const router = express.Router()

    router.delete('/clear', (req, res) => {
        db.courses = []
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    })


    return router
}