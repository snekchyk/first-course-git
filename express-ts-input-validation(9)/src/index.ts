import express, {NextFunction, Request, Response} from 'express'
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";

const app = express()
const port = 5000

const trimMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    req.body.title = req.body.title.trim()
    next()
}

app.use(express.json())
app.use(trimMiddleWare)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})