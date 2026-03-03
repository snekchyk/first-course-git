import express from 'express'
import {runDb} from './repositories/db.js'
import {productsRouter} from "./routes/products-route.js";
import {addressesRouter} from "./routes/addresses-route.js";

const app = express()
const port = 5000

app.use(express.json())

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

const runApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server has started on port ${port}`)
})}

runApp()