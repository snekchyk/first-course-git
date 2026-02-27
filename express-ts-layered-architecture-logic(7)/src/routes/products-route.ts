import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";


export const productsRouter = Router()

productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())

    res.send(foundProducts);
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductsById(+req.params.id!)

    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isSuccess = productsRepository.deleteProduct(+req.params.id!)

    if (isSuccess) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.post("/", (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    const product = productsRepository.updateProduct(req.body.id, req.body.title)

    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})