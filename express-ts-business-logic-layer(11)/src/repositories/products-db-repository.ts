import {productsCollection, ProductType} from "./db.js";


export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        let filter: any = {}

        if (title) {
            filter.title = { $regex: title}
        }

        return productsCollection.find(filter).toArray()
    },
    async findProductsById(id: number): Promise<ProductType | null> {
        let product: ProductType | null = await productsCollection.findOne({id})

        return product
    },
    async createProduct(newProduct: ProductType): Promise<ProductType> {
        await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {

        const result = await productsCollection.updateOne({id: id}, { $set: {title: title}})

        return result.modifiedCount === 1
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1

    }
}