import {usersCollection} from "./db.js";

export const usersRepository = {
    async createUser(newUser: object): Promise<any> {
        await usersCollection.insertOne(newUser)
        return true
    },
    async findUserByLogin(login: string): Promise<any> {
        console.log(3)
        const res = await usersCollection.findOne({ username: login})
        console.log("4" + res)
        return res

    }
}