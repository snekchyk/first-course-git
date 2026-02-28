import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";

import {body, validationResult} from 'express-validator'

export const productsRouter = Router()

const titleValidator = body('title').isLength({min: 3, max: 10}).withMessage('Title length should be from 3 to 10 symbols')


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

productsRouter.post("/", titleValidator, (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id',titleValidator, (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const product = productsRepository.updateProduct(req.body.id, req.body.title)

    if (product) {
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})