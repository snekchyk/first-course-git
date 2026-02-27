import express, {NextFunction, Request, Response} from "express"

const app = express()
const port = 3000


const blablaMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blabla = 'fucking nodejs'
    next()
}
const authGuardMiidleWare = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === "123") {
        next()
    } else {
        res.sendStatus(401)
    }
}

app.use(blablaMiddleWare)
app.use(authGuardMiidleWare)


app.get('/products', (req: Request, res: Response) => {
    // @ts-ignore
    const blabla = req.blabla
    res.send({value: blabla})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})