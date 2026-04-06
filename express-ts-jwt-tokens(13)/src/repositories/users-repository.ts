import {usersCollection} from "./db.js";

export const usersRepository = {
    async createUser(newUser: object): Promise<any> {
        await usersCollection.insertOne(newUser)
        return true
    },
    async findUserByLogin(login: string): Promise<any> {
        const user = await usersCollection.findOne({ username: login})
        console.log("!!! База нашла пользователя:", user) // ДОБАВЬ ЭТО
        return user
    },
    async findUserById(userId: any) {
        return await usersCollection.findOne({_id: userId})
    }
}