import {Request, Response, Router} from "express"
import {productsService} from "../domain/products-service.js"

export const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts = await productsService.findProducts(req.query.title?.toString())

    res.send(foundProducts);
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsService.findProductsById(+req.params.id!)

    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isSuccess = await productsService.deleteProduct(+req.params.id!)

    if (isSuccess) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.post("/", async (req: Request, res: Response) => {
    debugger;
    const newProduct = await productsService.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', async (req: Request, res: Response) => {
    const product = await productsService.updateProduct(req.body.id, req.body.title)

    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})