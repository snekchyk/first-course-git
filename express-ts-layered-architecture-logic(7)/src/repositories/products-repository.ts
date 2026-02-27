const products = [{id: 1, title: "tomato"}, {id: 2, title: "orange"}]

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
    findProductsById(id: number) {
        return products.find(p => p.id === id)
    },
    createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    updateProduct(id: number, title: string) {
        let product = products.find(p => p.id === Number(id))

        if (product) {
            product.title = title
            return product
        }
    },
    deleteProduct(id: number) {
        for (const product of products) {
            if (product.id === id) {
                const index = products.indexOf(product)
                products.splice(index, 1)

                return true;
            }
        }
        return false;
    }
}