import {Request, Response, Router} from "express";

const addresses = [{id: 1, value: "Vasylenko 12"}, {id: 2, value: "Garmatna 59/A"}]

export const addressesRouter = Router()

addressesRouter.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})

addressesRouter.get('/addresses/:id', (req: Request, res: Response) => {
    let address = addresses.find(p => p.id === Number(req.params.id))

    if (address) {
        res.send(address)
    } else {
        res.sendStatus(404)
    }
})

addressesRouter.delete('/addresses/:id', (req: Request, res: Response) => {

    const targetId = Number(req.params.id)

    for (const address of addresses) {
        if (address.id === targetId) {
            const index = addresses.indexOf(address)
            addresses.splice(index, 1)

            res.sendStatus(204)
            return;
        }
    }

    res.sendStatus(404)
})

addressesRouter.post("/addresses", (req: Request, res: Response) => {
    if (req.body.title) {
        const newAddress = {
            id: +(new Date()),
            value: req.body.title
        }

        addresses.push(newAddress)
        res.status(201).send(newAddress)
    } else {
        res.sendStatus(400)
    }
})