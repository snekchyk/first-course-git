import { MongoClient } from 'mongodb'

const mongoURI = process.env.mongoURI || 'mongodb://127.0.0.1:27017'

export const client = new MongoClient(mongoURI)

export type ProductType = {
    id: number,
    title: string
}

const db = client.db("shop")
export const productsCollection = db.collection<ProductType>("products")

export async function runDb() {
    try {
        await client.connect();
        await client.db("shop").command({ ping: 1 })

        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can`t connect to db")

        await client.close()
    }
}