import { MongoClient } from 'mongodb'

const mongoURI = process.env.mongoURI || 'mongodb://127.0.0.1:27017'

export const client = new MongoClient(mongoURI)

export const db = client.db("login-passwords")
export const usersCollection = db.collection("password")

export async function runDb() {
    try {
        await client.connect();
        await client.db("login-passwords").command({ ping: 1 })

        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can`t connect to db")

        await client.close()
    }
}