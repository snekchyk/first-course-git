 import express from 'express'
import {productsRouter} from "./routes/products-route";
import {addressesRouter} from "./routes/addresses-route";

const app = express()
const port = 5000

app.use(express.json())

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})