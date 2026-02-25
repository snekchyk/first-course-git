import express from 'express';
const app = express();
const port = 5000;
app.use(express.json());
const products = [{ id: 1, title: "tomato" }, { id: 2, title: "orange" }];
const addresses = [{ id: 1, value: "Vasylenko 12" }, { id: 2, value: "Garmatna 59/A" }];
app.get('/products', (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.get('/products/:id', (req, res) => {
    let product = products.find(p => p.id === Number(req.params.id));
    if (product) {
        res.send(product);
    }
    else {
        res.sendStatus(404);
    }
});
app.delete('/products/:id', (req, res) => {
    const targetId = Number(req.params.id);
    for (const product of products) {
        if (product.id === targetId) {
            const index = products.indexOf(product);
            products.splice(index, 1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
});
app.post("/products", (req, res) => {
    if (req.body.title) {
        const newProduct = {
            id: +(new Date()),
            title: req.body.title
        };
        products.push(newProduct);
        res.status(201).send(newProduct);
    }
    else {
        res.sendStatus(400);
    }
});
app.put('/products/:id', (req, res) => {
    let product = products.find(p => p.id === Number(req.params.id));
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.sendStatus(404);
    }
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    let address = addresses.find(p => p.id === Number(req.params.id));
    if (address) {
        res.send(address);
    }
    else {
        res.sendStatus(404);
    }
});
app.delete('/addresses/:id', (req, res) => {
    const targetId = Number(req.params.id);
    for (const address of addresses) {
        if (address.id === targetId) {
            const index = addresses.indexOf(address);
            addresses.splice(index, 1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
});
app.post("/addresses", (req, res) => {
    if (req.body.title) {
        const newAddress = {
            id: +(new Date()),
            value: req.body.title
        };
        addresses.push(newAddress);
        res.status(201).send(newAddress);
    }
    else {
        res.sendStatus(400);
    }
});
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
//# sourceMappingURL=index.js.map