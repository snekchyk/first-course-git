export type ProductType = {
    id: number,
    title: string
}

const products: ProductType[] = [{id: 1, title: "tomato"}, {id: 2, title: "orange"}]

export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else {
            return products
        }
    },
    async  findProductsById(id: number): Promise<ProductType | null> {
        let product = products.find(p => p.id === id)
        if (product) {
            return product
        } else {
            return null
        }
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<ProductType | null> {
        let product = products.find(p => p.id === Number(id))

        if (product) {
            product.title = title
            return product
        }
        return null
    },
    async deleteProduct(id: number): Promise<boolean> {
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