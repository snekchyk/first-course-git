import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-db-repository";


export const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts = await productsRepository.findProducts(req.query.title?.toString())

    res.send(foundProducts);
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsRepository.findProductsById(+req.params.id!)

    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isSuccess = await productsRepository.deleteProduct(+req.params.id!)

    if (isSuccess) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.post("/", async (req: Request, res: Response) => {
    const newProduct = await productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', async (req: Request, res: Response) => {
    const product = await productsRepository.updateProduct(req.body.id, req.body.title)

    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})