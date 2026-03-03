import {productsRepository} from '../repositories/products-db-repository.js'
import { ProductType } from "../repositories/db.js";

export const productsService = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]> {
        return productsRepository.findProducts(title)
    },
    async findProductsById(id: number): Promise<ProductType | null> {
        return productsRepository.findProductsById(id)
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title: title
        }

        const result = await productsRepository.createProduct(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        return await productsRepository.updateProduct(id, title)
    },
    async deleteProduct(id: number): Promise<boolean> {
        return await productsRepository.deleteProduct(id)

    }
}